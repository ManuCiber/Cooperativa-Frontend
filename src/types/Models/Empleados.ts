export interface Empleado {
    empleado_id: number;
    id?: number;
    nombre: string;
    apellidos: string;
    dni_cedula: string;
    cargo: string;
    departamento: string;
    estado: 'Activo' | 'Inactivo';
    salario: number;
    fechaContratacion: string; // ISO date string
}
