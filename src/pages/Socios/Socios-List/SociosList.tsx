import { useEffect, useState } from "react";
import type { Socio } from "../../../types/Models/Socios";
import { getAll } from "../../../services/service";
import GenericForm from "../../../components/UI/GenericForm";
import type { Column } from "../../../types/Components/Table";

const columns: Column<Socio>[] = [
    { header: "Nombre", accessor: (row) => `${row.nombre} ${row.apellido}` },
    { header: "email", accessor: (row) => row.email},
    { header: "Teléfono", accessor: (row) => row.telefono }
]

const SocioList: React.FC = () => {

    const [socios, setSocios] = useState<Socio[]>([]);

    useEffect(()=> {
        (async () => {
            try {
                const sociosData = await getAll<Socio>("socios");
                setSocios(sociosData);
            } catch (error) {
                console.log("Error fetching socios:", error);
                throw error;
            }
        })
    },[])



    return (
        <div></div>     
    )

  return <div>Socios List Page</div>;
}

export default SocioList;