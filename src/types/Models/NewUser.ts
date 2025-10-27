import type { RolesName } from "../Roles";
import type { User } from "./User";

export interface NewUser extends Omit<User, "id" | "roles">{
    empleadoId?: string;
    username: string;
    cargo: string;
    rol: RolesName;
    password: string;
}