// import { useState, type ReactNode } from "react"

// type Props = {
//     children: ReactNode;
// }

// const DashboardLayout = ({children}: Props) => {
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     return(
//         <div className="flex h-screen bg-gray-100">
//             {/*Sidebar*/}
//             <div
//             className={`${sidebarOpen ? "w-64": "w-16"} bg-cyan-700 text-white flex flex-col transition-all duration-300`}
//             >
//                 <div className="flex items-center justify-between p-4">
//                     <h2 className={`text-lg font-bold transition-opacity ${sidebarOpen ? "opacity-100": "opacity-0"}`}>Cooperativa</h2>
//                     <button onClick={()=> setSidebarOpen(!sidebarOpen)}>
//                         <i className="fas fa-bars"></i>
//                     </button>   
//                 </div>
//                 <nav className="flex-1 px-2 space-y-2">
//                     <a href="/dashboard"
//                     className="flex items-center gap-3 p-2 rounded hover:bg-cyan-600">
//                         <i className="fas fa-cart-line">{sidebarOpen && <span>Dashboard</span>}</i>
//                     </a>
//                     <a href="/socios" className="flex items-center gap-3 p-2 rounded hover: bg-cyan-600">
//                         <i className="fas fa-users"></i>
//                         {sidebarOpen && <span>Socios</span>}
//                     </a>
//                     <a href="/aportes" className="flex items-center gap-3 p-2 rounded hover: bg-cyan-600">
//                         <i className="fas fa-money-bill"></i>
//                         {sidebarOpen && <span>Aportes</span>}
//                     </a>
//                     <a href="/perfil" className="flex items-center gap-3 p-2 rounded hover: bg-cyan-600">
//                         <i className="fas fa-user"></i>
//                         {sidebarOpen && <span>Perfil</span>}
//                     </a>
//                 </nav>
//                 <div className="p-4">
//                     <button className="flex items-center gap-3 p-2 w-full ltext-left hover:bg-red-600 rounded">
//                         <i className="fas fa-sign-out-alt"></i>
//                         {sidebarOpen && <span>Cerrar Sesión</span>}
//                     </button>
//                 </div>
//             </div>

//             {/*Contenido del menú*/}
//                   <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <h1 className="text-xl font-semibold text-gray-700">
//             Panel de Cooperativa
//           </h1>
//           <div className="flex items-center gap-4">
//             <span className="text-gray-600">Hola, Usuario</span>
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="avatar"
//               className="rounded-full w-10 h-10"
//             />
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//         </div>
//     )
// }

// export default DashboardLayout;

// import { useState, type ReactNode } from "react";
// import Navbar from "../components/Layout/Navbar"; // tu Navbar genérico mejorado
// import type { SidebarItem } from "../types/Sidebar";
// import Sidebar from "../components/Layout/Sidebar"; // Sidebar genérico
// import { useAuth } from "../hooks/useAuth";

// type Props = {
//   children: ReactNode;
// };

// const DashboardLayout = ({ children }: Props) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { user, logout, hasRole } = useAuth();

//   // Definimos items de Sidebar
//   const sidebarItems: SidebarItem[] = [
//     { label: "Dashboard", icon: "fa-solid fa-gauge", path: "/dashboard" },
//     { label: "Socios", icon: "fa-solid fa-users", path: "/socios" },
//     { label: "Aportes", icon: "fa-solid fa-piggy-bank", path: "/aportes" },
//     { label: "Préstamos", icon: "fa-solid fa-hand-holding-dollar", path: "/prestamos" },
//     ...(hasRole("admin")
//       ? [{ label: "Configuración", icon: "fa-solid fa-gear", path: "/config" }]
//       : []),
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar
//         items={sidebarItems}
//         collapsed={!sidebarOpen}
//         toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//       />

//       {/* Contenido principal */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <Navbar
//           title="Panel de Cooperativa"
//           userName={user?.name}
//           avatar={user?.avatar}
//           onLogout={logout}
//           items={[
//             { label: "Inicio", icon: "fa-solid fa-house", onClick: () => {} },
//             { label: "Reportes", icon: "fa-solid fa-chart-line", onClick: () => {} },
//           ]}
//         />

//         {/* Content */}
//         <main className="flex-1 p-6 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import { useState, type ReactNode } from "react";
import Navbar from "../components/Layout/Navbar"; // Navbar genérico
import Sidebar from "../components/Layout/Sidebar"; // Sidebar genérico
import { useAuth } from "../hooks/useAuth";
import type { SidebarItem } from "../types/Sidebar";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout, hasRole } = useAuth();

  // Sidebar items filtrados por roles
  const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", icon: "fa-solid fa-gauge", path: "/dashboard" },
    { label: "Socios", icon: "fa-solid fa-users", path: "/socios" },
    { label: "Aportes", icon: "fa-solid fa-piggy-bank", path: "/aportes" },
    { label: "Préstamos", icon: "fa-solid fa-hand-holding-dollar", path: "/prestamos" },
    ...(hasRole("admin")
      ? [{ label: "Configuración", icon: "fa-solid fa-gear", path: "/config" }]
      : []),
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        collapsed={!sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          title="Panel de Cooperativa"
          userName={user?.name}
          avatar={user?.avatar}
          onLogout={logout}
          items={[
            { label: "Inicio", icon: "fa-solid fa-house", onClick: () => {} },
            { label: "Reportes", icon: "fa-solid fa-chart-line", onClick: () => {} },
          ]}
        />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
