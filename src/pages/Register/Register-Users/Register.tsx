import GenericForm
 from "../../../components/UI/GenericForm";

 
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
            { label: "Admin", value: "admin" },
            { label: "Gerente", value: "gerente" },
            { label: "Oficial de Negocios", value: "oficial_negocios" },
            { label: "Oficial de Servicios", value: "oficial_servicios" },
            { label: "Cajero", value: "cajero" },
          ],
        },
      ]}
      onSubmit={async (data) => {
        const res = await fetch("/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Error al registrar usuario");
        console.log("✅ Usuario creado:", await res.json());
      }}
      submitText="Registrar Usuario"
    />
  );
};

export default RegisterUser;
