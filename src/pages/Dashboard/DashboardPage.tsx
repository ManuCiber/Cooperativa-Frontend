// Simulado de datos 

import Card from "../../components/UI/Card";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashboardLayout";

const charData = [
    {name: "Enero", ingresos:4000, egresos:2400 },
    {name: "Febrero", ingresos:5000, egresos:2000 },
    {name: "Marzo", ingresos:7000, egresos:9000 },
    {name: "Abril", ingresos:8000, egresos:6000 },
]

const DashboardPage: React.FC = () => {
    const {user} = useAuth();

    return(
        <DashboardLayout>
            {/*Saludo*/}
            <h2 className="text-2xl font-semibold mb-4">
                Bienvenido, {user?.name}
            </h2>

            {/*Cards Con Metricas*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card title="Total Socios" className="bg-cyan-600 text-white">
                    <p className="text-2xl font-bold">120</p>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default DashboardPage;

