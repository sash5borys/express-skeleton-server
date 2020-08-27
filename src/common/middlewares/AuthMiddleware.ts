import * as config from "config";
import {Request, Response, NextFunction} from "express";
import {injectable} from "inversify";
import {BaseMiddleware} from "inversify-express-utils";
import {verify} from "jsonwebtoken";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction) {
        const token = req.header('auth-token');

        if (!token) return res.status(401).send('Access denied. No token provided.');

        try {
            verify(token, config.get('jwtPrivateKey'));
            next();
        } catch (ex) {
            res.status(400);
            res.send('Invalid token.');
        }
    }
}

