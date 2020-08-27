import * as config from "config";
import { inject, injectable } from "inversify";
import { uuid } from "uuidv4";
import { sign } from "jsonwebtoken";
import { SERVICE } from "../../identifiers";
import {TokenEntity} from "../entities";


export interface IJwtService {
    issueTokenPair(userId: string): Promise<TokenEntity | undefined>
}

@injectable()
export class JwtService implements IJwtService {
    @inject(SERVICE.TokenService) private tokenService: any;

    async issueTokenPair(userId: string): Promise<TokenEntity | undefined> {
        const newRefreshToken = uuid();
        await this.tokenService.add({
            token: newRefreshToken,
            refreshToken: newRefreshToken,
            userId,
        });

        return {
            token: sign({ id: userId }, config.get('jwtPrivateKey')),
            refreshToken: newRefreshToken,
            userId
        };
    }
}