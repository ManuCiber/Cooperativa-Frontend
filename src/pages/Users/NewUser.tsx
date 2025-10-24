import { GenericForm } from "../../components/UI/Form";
import DashboardLayout from "../../layouts/DashboardLayout";
import { create } from "../../services/service";
import type { Field } from "../../types/Components/Form"
import type { NewUser } from "../../types/Models/NewUser";

const NewUserPage: React.FC  = () => {
    
    const fields: Field[] =[
        {name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese el nombre", required: true},
        {name: "apellidos", label: "Apellidos", type: "text", placeholder: "Ingrese los apellidos", required: true},
        {name: "username", label: "Nombre de Usuario", type: "text", placeholder: "Ingrese el nombre de usuario", required: true},
        {name: "email", label: "Correo Electrónico", type: "email", placeholder: "Ingrese el correo electrónico", required: true},
        {name: "password", label: "Contraseña", type: "password", placeholder: "Ingrese la contraseña", required: true},
        {name: "cargo", label: "Cargo", type: "text", placeholder: "Ingrese el cargo", required: true},
        {
            name: "rol", 
            label: "Rol de Usuario",
            type: "select",
            options:[
                { label: "Administrador", value: "admin" },
                { label: "Gerente", value: "gerente" },
                { label: "Oficial de Negocios", value: "oficialNegocios" },
                { label: "Oficial de Servicios", value: "oficialServicios" },
                { label: "Cajero", value: "cajero" }
            ], required: true
        }
    ];

    const initialValues = {
        nombre: "",
        apellidos: "",
        username: "",
        email: "",
        password: "",
        cargo: "",
        rol: "",
        estado: "activo"
    };

    const handleSubmit = async (values: NewUser) => {
        try{
            const response = await create<NewUser>("/usuarios/add", values);
            console.log (response);
            console.log("Valores del formulario:", values);
            console.log("Datos enviados al crear usuario", values);
        }catch(error:any){
            console.error("Error al crear el usuario:", error.response?.data || error.message);
        }
    }
    
    return(
    <DashboardLayout>
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Usuario</h2>
                <GenericForm<NewUser>
                    initialValues={initialValues as unknown as NewUser}
                    fields={fields as unknown as any}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    </DashboardLayout>
    )
}

export default NewUserPage;