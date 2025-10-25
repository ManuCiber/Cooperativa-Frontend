import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { GenericForm } from "../../components/UI/Form";
import type { Field } from "../../types/Components/Form";
import type { Empleado } from "../../types/Models/Empleados";
import { useFetch } from "../../hooks/useFetch";
import { update } from "../../services/service";
import Button from "../../components/UI/Button";
import SuccessModal from "../../components/Modal/ModalNotificacion";

// ✅ Campos del formulario
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

  const { data: empleado, loading, error } = useFetch<Empleado>(`/empleados/${id}`);
  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ✅ Si no hay ID, mostrar error
  if (!id) {
    return <p className="p-4 text-red-500">⚠️ ID de empleado no proporcionado</p>;
  }

  const handleSave = async (updatedEmpleado: Empleado) => {
    setSaving(true);
    try {
      await update("/empleados", id, updatedEmpleado);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error al actualizar empleado:", err);
    } finally {
      setSaving(false);
    }
  };

  // ✅ Cuando el usuario cierre el modal → redirige
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/empleados");
  };

  if (loading) return <p className="p-4 text-gray-500">Cargando empleado...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!empleado) return <p className="p-4 text-gray-500">Empleado no encontrado</p>;

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* ✅ Encabezado */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Editar Empleado</h1>
          <Button
            text="Volver"
            icon="fa-solid fa-arrow-left"
            type="secondary"
            onClick={() => navigate("/empleados")}
          />
        </div>

        {/* ✅ Formulario */}
        <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto">
          <GenericForm<Empleado>
            initialValues={empleado}
            fields={empleadoFields as unknown as any}
            onSubmit={handleSave}
          />
        </div>
      </div>

      {/* ✅ Modal de éxito con redirección en cierre */}
      <SuccessModal
        show={showSuccessModal}
        message="¡Empleado editado correctamente!"
        onClose={handleCloseModal} // 👈 aquí se redirige al cerrar
      />
    </DashboardLayout>
  );
};

export default EmpleadoEditPage;
