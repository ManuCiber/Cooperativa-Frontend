import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { GenericForm } from "../../components/UI/Form";
import type { Field } from "../../types/Components/Form";
import type { Empleado } from "../../types/Models/Empleados";
import { useFetch } from "../../hooks/useFetch";
import { update } from "../../services/service";
import Button from "../../components/UI/Button";

const empleadoFields: Field[] = [
  { name: "nombre", label: "Nombre", type: "text", required: true },
  { name: "apellidos", label: "Apellidos", type: "text", required: true },
  { name: "dni_cedula", label: "DNI / Cédula", type: "text", required: true },
  { name: "cargo", label: "Cargo", type: "text", required: true },
  { name: "departamento", label: "Departamento", type: "text" },
  { name: "salario", label: "Salario", type: "number", required: true },
  {
    name: "estado",
    label: "Estado",
    type: "select",
    options: [
      { label: "Activo", value: "Activo" },
      { label: "Inactivo", value: "Inactivo" },
    ],
  },
];

const EmpleadoEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <p className="p-4 text-red-500">ID de empleado no proporcionado</p>;

  const { data: empleado, loading, error } = useFetch<Empleado>(`/empleados/${id}`);
  const [saving, setSaving] = useState(false);

  const handleSave = async (updatedEmpleado: Empleado) => {
    setSaving(true);
    try {
      await update("/empleados", id, updatedEmpleado);
      setSaving(false);
      navigate("/empleados");
    } catch (err) {
      console.error("Error al actualizar empleado:", err);
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Cargando empleado...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!empleado) return <p className="p-4 text-gray-500">Empleado no encontrado</p>;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Editar Empleado</h1>
          <Button
            text="Volver"
            icon="fa-solid fa-arrow-left"
            type="secondary"
            onClick={() => navigate("/empleados")}
          />
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 max-w-lg">
          <GenericForm<Empleado>
            initialValues={empleado}
            fields={empleadoFields as any}
            onSubmit={handleSave}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmpleadoEditPage;
