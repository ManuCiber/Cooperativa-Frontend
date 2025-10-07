export interface Socio {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    fechaNacimiento: string;
    fechaIngreso: string;
    estado: 'activo' | 'inactivo';
    tipoSocio: 'regular' | 'honorario' | 'fundador';
}
