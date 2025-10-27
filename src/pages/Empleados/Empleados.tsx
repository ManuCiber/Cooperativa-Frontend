import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/UI/Button";
import Table from "../../components/UI/Table";
import DashboardLayout from "../../layouts/DashboardLayout";
import ConfirmModal from "../../components/Modal/ModalConfirmacion";
import SuccessModal from "../../components/Modal/ModalNotificacion";
import { useFetch } from "../../hooks/useFetch";
import type { Empleado } from "../../types/Models/Empleados";
import { remove } from "../../services/service";

const EmpleadosPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: usersRaw, loading, error } = useFetch<Empleado[]>("/empleados");

  const [users, setUsers] = useState<Empleado[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);

  // Inicializa estado local al cargar datos
  useEffect(() => {
    if (usersRaw) {
      setUsers(usersRaw.map(u => ({ ...u, id: u.empleado_id ?? u.id })));
    }
  }, [usersRaw]);

  const handleOpenConfirm = (empleado: Empleado) => {
    setSelectedEmpleado({ ...empleado, id: empleado.empleado_id });
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmpleado) return;

    const id = selectedEmpleado.id;
    if (!id) return;

    try {
      // Petición al backend
      await remove("/empleados/delete", id);

      // Actualizar estado local solo después de eliminar exitosamente
      setUsers(prev => prev.filter(u => u.id !== id));

      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setSelectedEmpleado(null);
    } catch (err) {
      console.error("Error al eliminar empleado:", err);
      setShowConfirmModal(false);
    }
  };

  const columns = [
    { header: "Nombre", accessor: (user: Empleado) => `${user.nombre} ${user.apellidos}` },
    { header: "Dni / Cédula", accessor: "dni_cedula" as keyof Empleado },
    { header: "Cargo", accessor: "cargo" as keyof Empleado },
    { header: "Departamento", accessor: "departamento" as keyof Empleado },
    { header: "Salario", accessor: (user: Empleado) => `$${user.salario}` },
    {
      header: "Estado",
      accessor: (empleado: Empleado) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            empleado.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
        icon="fa-solid fa3-trash"
        type="danger"
        onClick={() => handleOpenConfirm(user)}
        className="px-2 py-1 text-sm"
      />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h1>
          <Button
            text="Agregar Empleado"
            icon="fa-solid fa-plus"
            type="primary"
            onClick={() => navigate("/empleados/new")}
          />
        </div>

        {loading && <p className="p-4 text-gray-500">Cargando empleados...</p>}
        {error && <p className="p-4 text-red-500">Error al cargar empleados: {error}</p>}
        {!loading && !error && users && (
          <Table<Empleado>
            columns={columns}
            data={users}
            actions={actions}
            className="shadow-md rounded-xl"
          />
        )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        title="Eliminar empleado"
        message={`¿Seguro que deseas eliminar a ${selectedEmpleado?.nombre ?? ""} ${selectedEmpleado?.apellidos ?? ""}? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />

      <SuccessModal
        show={showSuccessModal}
        message="Empleado eliminado correctamente !"
        onClose={() => setShowSuccessModal(false)}
      />
    </DashboardLayout>
  );
};

export default EmpleadosPage;
