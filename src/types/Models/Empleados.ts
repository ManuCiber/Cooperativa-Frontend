export interface Empleado {
    id?: number;
    nombre: string;
    apellidos: string;
    dni_cedula: string;
    cargo: string;
    departamento: string;
    estado: 'activo' | 'inactivo';
    salario: number;
    fechaContratacion: string; // ISO date string
}