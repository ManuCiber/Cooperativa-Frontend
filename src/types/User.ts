import type { RolesName } from "./Roles";


export interface User{
    id: number;
    name: string;
    email: string;
    avatar?: string;
    roles: RolesName[]
}