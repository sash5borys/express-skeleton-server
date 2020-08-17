import {getRepository, MigrationInterface} from "typeorm";
import {userSeed} from "../seeds/userSeed";
import {UserEntity} from "../../api/entities";

export class UserMigration1597664268262 implements MigrationInterface {
    public async up(): Promise<void> {
        await getRepository(UserEntity).save(userSeed);
    }

    public async down(): Promise<void> {
    }
}
