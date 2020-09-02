import {genSaltSync, hashSync} from "bcryptjs";

const salt = genSaltSync(10);

export const userSeed = [
    {
        name: "Admin",
        password: hashSync("Admin", salt)
    }
];