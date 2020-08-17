import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from "typeorm";

export interface IUserEntity {
    id: number,
    name: string,
    password: string,
    createdAt: string,
    updatedAt:string
}

@Entity("user")
export class UserEntity implements IUserEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    password!: string;
    @CreateDateColumn()
    createdAt!: string;
    @UpdateDateColumn()
    updatedAt!:string;
}