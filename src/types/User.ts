import type { RolesName } from "./Roles";


export interface User{
    id: number;
    name: string;
    email: string;
    roles: RolesName[]
}