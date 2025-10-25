import { useState } from "react";
import SuccessModal from "../../components/Modal/ModalNotificacion";
import { GenericForm } from "../../components/UI/Form";
import DashboardLayout from "../../layouts/DashboardLayout";
import { create } from "../../services/service";
import type { Field } from "../../types/Components/Form"
import type { Empleado } from "../../types/Models/Empleados";

const NewEmpleadoPage: React.FC  = () => {

    const [showSuccessModal, setShowSuccessModal] = useState(false);

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
                { label: "Activo", value: "Activo" },
                { label: "Inactivo", value: "Inactivo" },
            ], required: true
        },
        {name: "salario", label: "Salario", type: "number", placeholder: "Ingrese el Salario", required: true},
    ];

    const initialValues = {
        nombre: "",
        apellidos: "",
        dni_cedula: "",
        cargo: "",
        departamento: "",
        fecha_contratacion: "",
        salario: 0,
        estado: "Activo"
    };

    const handleSubmit = async (values: Empleado) => {
        try{
            const response = await create<Empleado>("/empleados/", values);
            console.log (response);
            setShowSuccessModal(true);
        }catch(error:any){
            console.error("Error al crear el usuario:", error.response?.data || error.message);
        }
    }
    
    return(
    <DashboardLayout>
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Empleado</h2>
                <GenericForm<Empleado>
                    initialValues={initialValues as unknown as Empleado}
                    fields={fields as unknown as any}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>

        <SuccessModal
            show={showSuccessModal}
            message="El empleado ha sido creado exitosamente !."
            onClose={() => setShowSuccessModal(false)}
        />
    </DashboardLayout>
    )
}

export default NewEmpleadoPage;