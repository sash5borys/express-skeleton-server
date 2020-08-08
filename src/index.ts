import "reflect-metadata";
import * as os from 'os';
import * as cluster from 'cluster';
import * as path from 'path';
import * as express from 'express';
import {Container} from "inversify";
import {InversifyExpressServer} from "inversify-express-utils";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import  * as config  from "config";
import {createConnection as connectToDb} from "typeorm";

import {ApplicationContainer, ApiContainer} from "./containers";

const port = 3000;
const containers = [ApplicationContainer, ApiContainer];

const setupCluster = () => {
    const numWorkers = os.cpus().length;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', worker => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            'Worker ' +
            worker.process.pid +
            ' died with code: ' +
            code +
            ', and signal: ' +
            signal
        );
        console.log('Starting a new worker');
        cluster.fork();
    });
};


const startServer = async () => {
    const container = new Container();

    await container.loadAsync(...containers);

    const app = new InversifyExpressServer(container);
    app.setConfig(app => {
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use(helmet());
    });

    const server = app.build();
    server.listen(port, () => {
        console.log(`Server running at http://127.0.0.1:${port}/`);
    });
};

// Run in cluster mode
(async () => {
    await connectToDb(config.get("Databases"));

    if (process.env.CLUSTER_MODE === 'true' && cluster.isMaster) {
        setupCluster();
    } else {
        await startServer();
    }
})();


