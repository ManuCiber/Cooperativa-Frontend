// Simulado de datos 

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../../components/UI/Card";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/DashboardLayout";

const charData = [
    {name: "Enero", ingresos:4000, gastos:2400 },
    {name: "Febrero", ingresos:5000, gastos:2000 },
    {name: "Marzo", ingresos:7000, gastos:9000 },
    {name: "Abril", ingresos:8000, gastos:6000 },
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
                    <p className="text-2xl font-bold">150</p>
                </Card>
                <Card title="Prestamos Activos" className="bg-blue-700 text-white">
                    <p className="text-2xl font-bold">12</p>
                </Card>
                <Card title="Ingresos del mes" className="bg-cyan-800 text-white">
                    <p className="text-2xl font-bold">RD$10,900.00</p>
                </Card>
            </div>

            {/*Grafico*/}

            <Card title="Ingresos vs Gastos">
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={charData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="ingresos" stroke="#0891b2" strokeWidth={2}/>
                            <Line type="monotone" dataKey="gastos" stroke="#1e3a8a" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

        </DashboardLayout>
    )
}

export default DashboardPage;