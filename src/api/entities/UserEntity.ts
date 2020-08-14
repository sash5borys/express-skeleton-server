import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export interface IUserEntity {
    id: number,
    name: string
}

@Entity("user")
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
}