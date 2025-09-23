// import type { SidebarProps } from "../../types/Sidebar";
// import { useAuth } from "../../hooks/useAuth";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Sidebar: React.FC<SidebarProps & { onToggle?: () => void }> = ({
//   items,
//   collapsed = false,
//   onToggle,
// }) => {
//   const { hasPermission, hasRole } = useAuth();
//   const [hovered, setHovered] = useState(false);

//   // Filtrar según permisos
//   const filteredItems = items.filter((item: any) => {
//     if (!item.permission) return true;
//     return hasPermission(item.permission) || hasRole("admin");
//   });

//   return (
//     <aside
//       className={`bg-cyan-800 text-white flex flex-col transition-all duration-300 ${
//         collapsed ? "w-16" : "w-60"
//       }`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Botón colapsar */}
//       <div className="flex justify-end p-2">
//         <button
//           onClick={onToggle}
//           className="text-white hover:text-cyan-300 transition"
//         >
//           <i className={`fa-solid ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
//         </button>
//       </div>

//       {/* Items */}
//       <nav className="flex-1 flex flex-col gap-2 p-2">
//         {filteredItems.map((item, idx) => (
//           <Link
//             key={idx}
//             to={item.path}
//             className="flex items-center gap-3 px-3 py-2 rounded hover:bg-cyan-700 transition"
//           >
//             {item.icon && <i className={`${item.icon} w-5 text-center`}></i>}
//             {!collapsed && <span>{item.label}</span>}
//             {collapsed && hovered && (
//               <span className="absolute left-16 bg-cyan-900 text-white px-2 py-1 rounded shadow-md">
//                 {item.label}
//               </span>
//             )}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { SidebarProps } from "../../types/Sidebar";
import { useState } from "react";

interface SidebarExtraProps extends SidebarProps {
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarExtraProps> = ({
  items,
  collapsed = false,
  toggleSidebar,
}) => {
  const { user, hasPermission, hasRole } = useAuth();
  const [hovered, setHovered] = useState(false);

  // Filtrar items según permisos/roles (si se agregan permisos opcionales en items)
  const filteredItems = items.filter((item: any) => {
    if (!item.permission) return true; // sin restricción
    return hasPermission(item.permission) || hasRole("admin");
  });

  return (
    <aside
      className={`flex flex-col bg-cyan-800 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Toggle */}
      <div className="flex items-center justify-between p-4">
        <h2
          className={`text-lg font-bold transition-opacity ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          Cooperativa
        </h2>
        <button onClick={toggleSidebar}>
          <i className={`fa-solid ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
        </button>
      </div>

      {/* Items */}
      <nav className="flex-1 px-2 space-y-2">
        {filteredItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="flex items-center gap-3 p-2 rounded hover:bg-cyan-700 transition relative"
          >
            {item.icon && <i className={`${item.icon} w-5 text-center`}></i>}
            {!collapsed && <span>{item.label}</span>}

            {/* Tooltip si está colapsado */}
            {collapsed && hovered && (
              <span className="absolute left-16 bg-cyan-900 px-2 py-1 rounded shadow-md text-sm">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout opcional */}
      {user && (
        <div className="p-4">
          <button
            className="flex items-center gap-3 p-2 w-full text-left hover:bg-red-600 rounded"
            onClick={() => console.log("Cerrar sesión")}
          >
            <i className="fa-solid fa-sign-out-alt"></i>
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
