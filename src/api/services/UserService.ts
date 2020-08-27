import {genSaltSync, hashSync} from "bcryptjs";
import {inject, injectable} from "inversify";
import {UserEntity} from "../entities";
import {REPOSITORY} from "../../identifiers";

export interface IUserService {
    getAllUsers(): Promise<UserEntity[]>
    getUserById(id: string): Promise<UserEntity>
    getUsersByIds(arrIds: []): Promise<UserEntity[]>
    getUsersByColumn(query: {}): Promise<UserEntity>
    createUser(user: UserEntity): Promise<UserEntity>
    updateUser(id: string, data: UserEntity): Promise<UserEntity>
    deleteUser(id: string): Promise<any>
}

@injectable()
export class UserService implements IUserService {
    @inject(REPOSITORY.UserRepository) private usersRepository: any;

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: string): Promise<UserEntity> {
        return await this.usersRepository.findOne(id);
    }

    async getUsersByIds(arrIds: []): Promise<UserEntity[]> {
        return await this.usersRepository.findByIds([...arrIds]);
    }

    async getUsersByColumn(query: {}): Promise<UserEntity> {
        return await this.usersRepository.find(query);
    }

    async createUser(user: UserEntity): Promise<UserEntity> {
        const salt = genSaltSync(10);
        user.password = hashSync(user.password, salt);
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