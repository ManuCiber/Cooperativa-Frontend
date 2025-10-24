import type { RolesName } from "../Roles";


export interface User{
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    avatar?: string;
    estado: 'activo' | 'inactivo' | 'pendiente';
    roles: RolesName[]
}