import { useState, type ReactNode } from "react";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../hooks/useAuth";
import type { SidebarItem } from "../types/Components/Sidebar";
import Footer from "../components/UI/Footer";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { hasRole } = useAuth();

  const sidebarItems: SidebarItem[] = [
    { label: "Inicio", icon: "fa-solid fa-gauge", path: "/dashboard" },
    { label: "Socios", icon: "fa-solid fa-users", path: "/socios" },
    { label: "Aportes", icon: "fa-solid fa-piggy-bank", path: "/aportes" },
    { label: "Préstamos", icon: "fa-solid fa-hand-holding-dollar", path: "/prestamos" },
    { label: "Pagos", icon: "fa-solid fa-money-bill-transfer", path: "/pagos" },
    {label: "Usuarios", icon: "fa-solid fa-users", path:"/users"},
    {label: "Empleados", icon: "fa-solid fa-user-tie", path:"/empleados"},
    { label: "Reportes", icon: "fa-solid fa-chart-line", path: "/reportes" },
    ...(hasRole("admin")
      ? [{ label: "Configuración", icon: "fa-solid fa-gear", path: "/configuracion" }]
      : []),
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        collapsed={!sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        {/* <Navbar
          title=""
          userName={user?.name}
          avatar={user?.avatar}
          onLogout={logout}
        /> */}

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {/* Aquí se renderizan los módulos dentro del layout */}
          <div className="bg-white rounded-xl shadow p-6 min-h-[60vh] transition">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
