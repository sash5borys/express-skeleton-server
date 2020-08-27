import { inject, injectable } from "inversify";
import { getCustomRepository, Repository } from "typeorm";
import { TokenEntity } from "../entities/TokenEntity";
import { REPOSITORY } from "../../identifiers";

export interface ITokenService {
    find(token: string): Promise<TokenEntity | undefined>,
    add(entry: TokenEntity): Promise<void>,
    remove(token: string): Promise<void>
}

@injectable()
export class TokenService implements ITokenService {
    @inject(REPOSITORY.TokenRepository) private tokenRepository: any;

    async find(token: string): Promise<TokenEntity | undefined> {
        return await this.tokenRepository.findOne(token);
    }

    async add(entry: TokenEntity): Promise<void> {
        await this.tokenRepository.save(entry);
    }

    async remove(query: string): Promise<void> {
        await this.tokenRepository.delete(query);
    }

}