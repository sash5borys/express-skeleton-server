import {Entity, Column, PrimaryColumn} from "typeorm";

export interface ITokenEntity {
    token: string,
    refreshToken:string,
    userId: string
}

@Entity("tokens")
export class TokenEntity implements ITokenEntity {
    @PrimaryColumn()
    token!: string;
    @PrimaryColumn()
    refreshToken!: string;
    @Column()
    userId!: string;
}