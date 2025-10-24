import { GenericForm } from "../../components/UI/Form";
import DashboardLayout from "../../layouts/DashboardLayout";
import { create } from "../../services/service";
import type { Field } from "../../types/Components/Form"
import type { NewUser } from "../../types/Models/NewUser";

const NewUserPage: React.FC  = () => {
    
    const fields: Field[] =[
        {name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese el nombre", required: true},
        {name: "apellidos", label: "Apellidos", type: "text", placeholder: "Ingrese los apellidos", required: true},
        {name: "dni_cedula", label: "Identificacion", type: "text", placeholder: "Ingrese DNI o Cedula", required: true},
        {name: "cargo", label: "Cargo", type: "text", placeholder: "Ingrese el Cargo que Ocupa", required: true},
        {name: "departamento", label: "Departamento", type: "text", placeholder: "Ingrese el Departamento", required: true},
        {name: "fecha_contratacion", label: "Fecha de Ingreso", type: "date", placeholder: "Ingrese la fecha de Contratación", required: true},
        {
            name: "estado", 
            label: "Estado de Usuario",
            type: "select",
            options:[
                { label: "Activo", value: "activo" },
                { label: "Inactivo", value: "inactivo" },
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