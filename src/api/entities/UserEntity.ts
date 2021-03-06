import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn} from "typeorm";

export interface IUserEntity {
    id: number,
    name: string,
    password: string,
    createdAt: string,
    updatedAt:string
}

@Entity("users")
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @PrimaryColumn()
    name!: string;
    @Column()
    password!: string;
    @CreateDateColumn()
    createdAt!: string;
    @UpdateDateColumn()
    updatedAt!:string;
}