import {compareSync} from "bcryptjs";
import {Response} from "express";
import {inject} from "inversify";
import {
    BaseHttpController,
    controller,
    httpPost,
    requestBody,
    requestParam,
    response
} from "inversify-express-utils";
import {MIDDLEWARE, SERVICE} from "../../identifiers";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";
import {IUserRequest} from "../../api/controllers";

export interface IAuthRequest extends Request {
    token: string,
    userId: string
}

@controller('/auth', AuthMiddleware)
export class AuthController extends BaseHttpController {
    @inject(SERVICE.UserService) private userService: any;
    @inject(SERVICE.JwtService) private jwtService: any;
    @inject(SERVICE.TokenService) private tokenService: any;

    @httpPost('/login')
    async login(@requestBody() params: IUserRequest, @response() res: Response) {
        const {name, password} = params;
        const user = await this.userService.getUsersByColumn({name: name});

        if (!user || !compareSync(password, user.password)) {
            res.status(403);
            res.send('Access denied. Password no valid.')
        }

        return await this.jwtService.issueTokenPair(user.id);
    }

    @httpPost('/refresh')
    async refreshTokenPair(@requestBody() entry: IUserRequest, @response() res: Response) {
        const {refreshToken} = entry;
        const dbToken = await this.tokenService.find(refreshToken);

        if (!dbToken) {
            return;
        }

        await this.tokenService.remove(refreshToken);
        const newUserTokenPair = await this.jwtService.issueTokenPair(dbToken.userId);
        return {...dbToken.userId, ...newUserTokenPair};
    }

    @httpPost('/logout')
    async logout(@requestParam('id') param: IUserRequest, @response() res: Response) {
        try {
            const userId = Number(param);
            return await this.tokenService.remove({userId});
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }

}