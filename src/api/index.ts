import {AsyncContainerModule} from "inversify";
import {getRepository, Repository} from "typeorm";

import {IUserEntity, UserEntity} from "./entities";
import {IUserService, UserService} from "./services";
import "./controllers";
import {REPOSITORY, SERVICE} from "./identifiers";


export const ApiContainer = new AsyncContainerModule(
    async (bind) => {
        // Provide User
        bind<Repository<UserEntity>>(REPOSITORY.UserRepository).toDynamicValue(() => getRepository(UserEntity));
        bind<IUserService>(SERVICE.UserService).to(UserService);

    }
);
