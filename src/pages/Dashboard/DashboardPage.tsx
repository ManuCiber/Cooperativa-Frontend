// Simulado de datos 

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../../components/UI/Card";
import DashboardLayout from "../../layouts/DashboardLayout";

const charData = [
    {name: "Enero", ingresos:4000, gastos:2400 },
    {name: "Febrero", ingresos:5000, gastos:2000 },
    {name: "Marzo", ingresos:7000, gastos:9000 },
    {name: "Abril", ingresos:8000, gastos:6000 },
]

const DashboardPage: React.FC = () => {
    return(
        <DashboardLayout>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Tarjetas resumen tipo cooperativa */}
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border-l-4 border-cyan-600">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Total Socios</h3>
                  <p className="text-2xl font-semibold text-gray-800">1,254</p>
                </div>
                <i className="fa-solid fa-users text-cyan-600 text-3xl"></i>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border-l-4 border-emerald-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Ahorros Activos</h3>
                  <p className="text-2xl font-semibold text-gray-800">$ 82,500</p>
                </div>
                <i className="fa-solid fa-piggy-bank text-emerald-500 text-3xl"></i>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border-l-4 border-indigo-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Préstamos Vigentes</h3>
                  <p className="text-2xl font-semibold text-gray-800">$ 45,200</p>
                </div>
                <i className="fa-solid fa-hand-holding-dollar text-indigo-500 text-3xl"></i>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border-l-4 border-amber-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Pagos del Mes</h3>
                  <p className="text-2xl font-semibold text-gray-800">$ 12,480</p>
                </div>
                <i className="fa-solid fa-money-bill-transfer text-amber-500 text-3xl"></i>
              </div>
            </div>
          </div>
          
            {/*Cards Con Metricas*/}
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