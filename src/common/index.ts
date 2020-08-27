import {AsyncContainerModule} from "inversify";
import {getRepository, Repository} from "typeorm";
import {TokenEntity} from "./entities";
import {IJwtService, JwtService, ITokenService, TokenService} from "./services";
import {REPOSITORY, SERVICE} from "../identifiers";
import "./controllers";
import {AuthMiddleware} from "./middlewares/AuthMiddleware";

export let ApplicationContainer = new AsyncContainerModule(
    async (bind) => {
        // Provide Auth functionality
        bind<Repository<TokenEntity>>(REPOSITORY.TokenRepository).toDynamicValue(() => getRepository(TokenEntity));
        bind<AuthMiddleware>(AuthMiddleware).to(AuthMiddleware);
        bind<IJwtService>(SERVICE.JwtService).to(JwtService);
        bind<ITokenService>(SERVICE.TokenService).to(TokenService);

    }
);

