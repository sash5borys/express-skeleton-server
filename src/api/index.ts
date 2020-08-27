import {AsyncContainerModule} from "inversify";
import {getRepository, Repository} from "typeorm";

import {IUserEntity, UserEntity} from "./entities";
import {IUserService, UserService} from "./services";
import {REPOSITORY, SERVICE} from "../identifiers";
import "./controllers";


export const ApiContainer = new AsyncContainerModule(
    async (bind) => {
        // Provide User functionality
        bind<Repository<UserEntity>>(REPOSITORY.UserRepository).toDynamicValue(() => getRepository(UserEntity));
        bind<IUserService>(SERVICE.UserService).to(UserService);

    }
);
