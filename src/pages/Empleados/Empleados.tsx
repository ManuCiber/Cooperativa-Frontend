import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/UI/Button";
import Table from "../../components/UI/Table";
import DashboardLayout from "../../layouts/DashboardLayout";
import ConfirmModal from "../../components/Modal/ModalConfirmacion";
import SuccessModal from "../../components/Modal/ModalNotificacion";
import { useFetch } from "../../hooks/useFetch";
import type { Empleado } from "../../types/Models/Empleados";
import { remove, update } from "../../services/service";

const EmpleadosPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: usersRaw, loading, error } = useFetch<Empleado[]>("/empleados"); // ✅ Añadido refetch al destructuring

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmpleadoData, setEditEmpleadoData] = useState<Empleado | null>(null);

  const users = usersRaw?.map((u) => ({
    ...u,
    id: u.empleado_id ?? u.id,
  }));

  // Abrir modal de confirmación
  const handleOpenConfirm = (empleado: Empleado) => {
    setSelectedEmpleado(
      {
        ...empleado,
        id: empleado.empleado_id,
      }
    );
    console.log("Empleado seleccionado para eliminación:", empleado);
    setShowConfirmModal(true);
  };

 const handleOpenEdit = (empleado: Empleado) => {
    setEditEmpleadoData(empleado);
    setShowEditModal(true);
  }

 const handleSaveEdit = async (updatedEmpleado: Empleado) => {
    // La lógica para guardar los cambios del empleado
    if(!editEmpleadoData) return;
    try {
      await update<Empleado>("/empleados", updatedEmpleado.id ?? updatedEmpleado.empleado_id, updatedEmpleado);
      setEditEmpleadoData(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
    }
    console.log("Empleado actualizado:", updatedEmpleado);
  }
  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!selectedEmpleado) return;

    const id = selectedEmpleado.id ?? selectedEmpleado.empleado_id;
    if (id === undefined || id === null) {
      console.error("Selected empleado has no id:", selectedEmpleado);
      setShowConfirmModal(false);
      return;
    }

    try {
      await remove("/empleados", id);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setSelectedEmpleado(null);
      } catch (err) {
      console.error("Error al eliminar empleado:", err);
      setShowConfirmModal(false);
    }
  };

  const columns = [
    {
      header: "Nombre",
      accessor: (user: Empleado) => `${user.nombre} ${user.apellidos}`,
    },
    { header: "Dni / Cédula", accessor: "dni_cedula" as keyof Empleado },
    { header: "Cargo", accessor: "cargo" as keyof Empleado },
    { header: "Departamento", accessor: "departamento" as keyof Empleado },
    { header: "Salario", accessor: (user: Empleado) => `$${user.salario}` },
    {
      header: "Estado",
      accessor: (empleado: Empleado) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            empleado.estado === "Activo"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {empleado.estado.charAt(0).toUpperCase() + empleado.estado.slice(1).toLowerCase()}
        </span>
      ),
    },
  ];

  const actions = (user: Empleado) => (
    <div className="flex justify-center gap-2">
      <Button
        icon="fa-solid fa-pen"
        type="primary"
        onClick={() => navigate(`/empleados/edit/${user.id}`)}
        className="px-2 py-1 text-sm"
      />
      <Button
        icon="fa-solid fa-trash"
        type="danger"
        onClick={() => handleOpenConfirm(user)}
        className="px-2 py-1 text-sm"
      />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h1>
          <Button
            text="Agregar Empleado"
            icon="fa-solid fa-plus"
            type="primary"
            onClick={() => navigate("/empleados/new")}
          />
        </div>

        {/* Tabla de Usuarios */}
        {loading && <p className="p-4 text-gray-500">Cargando empleados...</p>}
        {error && <p className="p-4 text-red-500">Error al cargar empleados: {error}</p>}
        {!loading && !error && users && (
          <Table<Empleado>
            columns={columns}
            data={users ?? []}
            actions={actions}
            className="shadow-md rounded-xl"
          />
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        show={showConfirmModal}
        title="Eliminar empleado"
        message={`¿Seguro que deseas eliminar a ${selectedEmpleado?.nombre ?? ""} ${selectedEmpleado?.apellidos ?? ""}? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Modal de éxito */}
      <SuccessModal
        show={showSuccessModal}
        message="Empleado eliminado correctamente !"
        onClose={() => setShowSuccessModal(false)}
      />
    </DashboardLayout>
  );
};

export default EmpleadosPage;
