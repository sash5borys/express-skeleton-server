import {Response} from "express";
import {inject} from "inversify";
import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost,
    requestBody,
    requestParam,
    response
} from "inversify-express-utils";
import {MIDDLEWARE, SERVICE} from "../../identifiers";
import {AuthMiddleware} from "../../common/middlewares/AuthMiddleware";

export interface IUserRequest extends Request {
    id: string,
    name: string,
    password: string,
    token: string,
    refreshToken: string
}

@controller('/user')
export class UserController extends BaseHttpController {
    @inject(SERVICE.UserService) private userService: any;
    @inject(SERVICE.JwtService) private jwtService: any;

    @httpGet('/', AuthMiddleware)
    async getUsers(@response() res: Response) {
        try {
            return await this.userService.getAllUsers();
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }

    @httpGet('/:id', AuthMiddleware)
    async getUser(@requestParam('id') param: string, @response() res: Response) {
        try {
            const userId = Number(param);
            return await this.userService.getUserById(userId);
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }

    @httpPost('/')
    async createUser(@requestBody() entry: IUserRequest, @response() res: Response) {
        try {
            const newUser = await this.userService.createUser(entry);
            const newUserTokenPair = await this.jwtService.issueTokenPair(newUser.id);
            res.header('auth-token', newUserTokenPair);
            return {...newUser, ...newUserTokenPair};
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }

    @httpPost('/:id', AuthMiddleware)
    async updateUser(@requestParam('id') param: string, @requestBody() entry: IUserRequest, @response() res: Response) {
        try {
            const userId = Number(param);
            const userData = JSON.stringify(entry)
            return await this.userService.updateUser(userId, userData);
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }
}