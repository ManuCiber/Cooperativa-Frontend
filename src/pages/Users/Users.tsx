import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Table from "../../components/UI/Table";
import { useFetch } from "../../hooks/useFetch";
import DashboardLayout from "../../layouts/DashboardLayout";
import type { User } from "../../types/Models/User";

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const {data: users, loading, error} = useFetch<User[]>('http://localhost:3000/api/usuarios/users');
  const columns = [
    {header: "Nombre", accessor: (user: User) => `${user.nombre} ${user.apellidos}`},
    {header: "Email", accessor: "email" as keyof User},
    {header: "Rol", accessor: "rol" as keyof User},
    {header: "Estado",
      accessor: (user: User) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.estado === 'activo' ? 'bg-green-100 text-green-800' : user.estado === 'inactivo' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {user.estado.charAt(0).toUpperCase() + user.estado.slice(1).toLowerCase()}
        </span>
      )
    }
  ];

  const actions = (user: User) => (
    <div className="flex justify-center gap-2">
      <Button
        icon="fa-solid fa-pen"
        type="primary"
        onClick={() => console.log("Editar usuario", user.id)
        }
        className="px-2 py-1 text-sm"
      />
      <Button
        icon="fa-solid fa-trash"
        type="danger"
        onClick={() => console.log("Eliminar Usuario", user.id)}
        className="px-2 py-1 text-sm"
      />
    </div>
  )

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/*Cabecera*/}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <Button 
            text="Agregar Usuario"
            icon="fa-solid fa-plus"
            type="primary"
            onClick={() => navigate('/users/new')}
         />
        </div>

        {/*Tabla de Usuarios*/}
        {loading && <p className="p-4 text-gray-500">Cargando usuarios...</p>}
        {error && <p className="p-4 text-red-500">Error al cargar usuarios: {error}</p>}
        {!loading && !error && users && (
          <Table<User>
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

export default UserPage;