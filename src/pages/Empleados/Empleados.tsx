import Button from "../../components/UI/Button";
import Table from "../../components/UI/Table";
import { useFetch } from "../../hooks/useFetch";
import DashboardLayout from "../../layouts/DashboardLayout";
import type { Empleado } from "../../types/Models/Empleados";

const EmpleadosPage: React.FC = () => {
  //const navigate = useNavigate();
  const {data: users, loading, error} = useFetch<Empleado[]>('/empleados');
  console.log(users)
  const columns = [
    {header: "Nombre", accessor: (user: Empleado) => `${user.nombre} ${user.apellidos}`},
    {header: "Dni / Cedula", accessor: "dni_cedula" as keyof Empleado},
    {header: "Cargo", accessor: "cargo" as keyof Empleado},
    {header: "Departamento", accessor: "departamento" as keyof Empleado},
    {header: "Salario", accessor: (user: Empleado) => `$${user.salario}`},
    {header: "Estado",
      accessor: (empleado: Empleado) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${empleado.estado === 'activo' ? 'bg-green-100 text-green-800' : empleado.estado === 'inactivo' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {empleado.estado.charAt(0).toUpperCase() + empleado.estado.slice(1).toLowerCase()}
        </span>
      )
    }
  ];

  const actions = (user: Empleado) => (
    <div className="flex justify-center gap-2">
      <Button
        icon="fa-solid fa-pen"
        type="primary"
        onClick={() => console.log("Editar empleado", user.id)
        }
        className="px-2 py-1 text-sm"
      />
      <Button
        icon="fa-solid fa-trash"
        type="danger"
        onClick={() => console.log("Eliminar empleado", user.id)}
        className="px-2 py-1 text-sm"
      />
    </div>
  )

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/*Cabecera*/}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h1>
          <Button 
            text="Agregar Empleado"
            icon="fa-solid fa-plus"
            type="primary"
            onClick={() => console.log('nuevo empleado')}
         />
        </div>

        {/*Tabla de Usuarios*/}
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
    </DashboardLayout>
  );
}

export default EmpleadosPage;