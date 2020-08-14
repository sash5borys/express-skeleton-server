import {inject, injectable} from "inversify";
import {UserEntity} from "../entities";
import {REPOSITORY} from "../identifiers";

export interface IUserService {
    getAllUsers(): Promise<UserEntity[]>
    getUserById(id: string): Promise<UserEntity>
    getUsersByIds(arrIds: []): Promise<UserEntity[]>
    createUser(user: UserEntity): Promise<UserEntity>
    updateUser(id: string, data: UserEntity): Promise<UserEntity>
    deleteUser(id: string): Promise<any>
}

@injectable()
export class UserService implements IUserService {
    constructor(@inject(REPOSITORY.UserRepository) private usersRepository: any) {
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: string): Promise<UserEntity> {
        return await this.usersRepository.findOne(id);
    }

    async getUsersByIds(arrIds: []): Promise<UserEntity[]> {
        return await this.usersRepository.findByIds([...arrIds]);
    }

    async createUser(user: UserEntity): Promise<UserEntity> {
        return await this.usersRepository.save(user);
    }

    async updateUser(id: string, data: UserEntity): Promise<UserEntity> {
        await this.usersRepository.update(id, data);
        return await this.getUserById(id);
    }

    async deleteUser(id: string): Promise<any> {
        return await this.usersRepository.delete(id);
    }

}