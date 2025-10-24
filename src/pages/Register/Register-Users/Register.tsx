import GenericForm
 from "../../../components/UI/GenericForm";
import { create } from "../../../services/service";
import type { User } from "../../../types/Models/User";

 
const RegisterUser = () => {
  return (
    <GenericForm
      title="Registrar Usuario"
      fields={[
        {
          name: "nombre",
          label: "Nombre Completo",
          type: "text",
          icon: "fa-solid fa-id-card",
          placeholder: "Ej. Juan Pérez",
        },
        {
          name: "email",
          label: "Correo Electrónico",
          type: "email",
          icon: "fa-solid fa-envelope",
          placeholder: "ejemplo@correo.com",
        },
        {
          name: "usuario",
          label: "Usuario",
          type: "text",
          icon: "fa-solid fa-user",
          placeholder: "Nombre de usuario",
        },
        {
          name: "password",
          label: "Contraseña",
          type: "password",
          icon: "fa-solid fa-lock",
          placeholder: "Ingresa tu contraseña",
        },
        {
          name: "roles",
          label: "Roles",
          type: "select",
          multiple: true, // ✅ permite seleccionar varios
          options: [
            { label: "Admin", value: "administrador" },
            { label: "Gerente", value: "gerente" },
            { label: "Oficial de Negocios", value: "oficial_negocios" },
            { label: "Oficial de Servicios", value: "oficial_servicios" },
            { label: "Cajero", value: "cajero" },
          ],
        },
      ]}
      onSubmit={async (data) => {
        try {
          const res = await create<User>("/api/empleados/",data);
          console.log("Usuario creado: ", res);
        } catch (error){  
            console.error("Error al Crear Usuario: ", error);
        }
        console.log(data)
      }}
      submitText="Registrar Usuario"
    />
  );
};

export default RegisterUser;
