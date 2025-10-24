import type { RolesName } from "../Roles";

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
        roles: RolesName[];
    }
}