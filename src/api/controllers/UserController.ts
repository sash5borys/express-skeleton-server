import * as express from 'express';
import {inject} from "inversify";
import {controller, httpGet, httpPost, requestBody, requestParam, response} from "inversify-express-utils";
import {SERVICE} from "../identifiers";

@controller('/user')
export class UserController {
    constructor(@inject(SERVICE.UserService) private userService: any) {
    }

    @httpGet('/')
    async getUsers(@response() res: express.Response) {
        try {
            return await this.userService.getAllUsers();
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }

    @httpGet('/:id')
    async getUser(@requestParam('id') param: string, @response() res: express.Response) {
        try {
            const id = parseInt(param);
            return await this.userService.getUserById(id);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }

    @httpPost('/')
    async createUser(@requestBody() newUser: express.Request, @response() res: express.Response) {
        try {
            return await this.userService.createUser(newUser);
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }

    @httpPost('/:id')
    async updateUser(@requestParam('id') param: string, @requestBody() data: express.Request, @response() res: express.Response) {
        try {
            const id = parseInt(param);
            return await this.userService.updateUser(id, data);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }
}