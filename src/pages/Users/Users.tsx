import { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import type { User } from "../../types/User";
import { getAll } from "../../services/service";
import Button from "../../components/UI/Button";


const UsuariosPage = () => {
    
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {header: "ID", accessor: "id" as const},
        {header: "Nombre", accessor: "name" as const },
        {header: "Correo", accessor: "email" as const},
        {header: "Roles", accessor: (row:User) => row.roles.join(",")}
    ];
    
    // -> Para cargar los usuarios a la hora de montar el componente:
    
    useEffect(()=> {
        const fetchUsuarios = async () => {
            try {
                const data = await getAll<User>("/usuarios");
                setUsuarios(data)
            } catch (error) {
                console.error("Error al cargar Usuarios: ", error)
            } finally{
                setLoading(false)
            }
        }
        fetchUsuarios()
    }, [])
    
    if(loading) {return <p className="p-4">Cargando Usuarios...</p>}

    return(
        <div className="4">
            <h1 className="text-xl font-semibold mb-4">Gestion de Usuarios</h1>
            <Table
                columns={columns}
                data={usuarios}
                actions={(user) => (
                    <div className="flex gap-2">
                        <Button text="editar" onClick={()=> console.log("Editar", user)
                        } className="text-blue-500 hover:underline" icon="fas fa-edit"/>
                        <Button text="eliminar" onClick={()=> console.log("Eliminar", user)} icon="fas fa-trash" className="text-red-500 hover:underline"/>
                    </div>
                )} className="rounded-lg shadow-md"
            ></Table>
        </div>
    )
}

export default UsuariosPage;