import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { SidebarProps } from "../../types/Components/Sidebar";
import { useState } from "react";

interface SidebarExtraProps extends SidebarProps {
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarExtraProps> = ({
  items = [],
  collapsed = false,
  toggleSidebar,
}) => {
  const { user, hasPermission, hasRole } = useAuth();
  const [hovered, setHovered] = useState(false);

  // Filtrar ítems según permisos o roles
  const filteredItems = items.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(item.permission as any) || hasRole("admin");
  });

  return (
    <aside
      className={`flex flex-col bg-cyan-800 text-white transition-all duration-300 shadow-lg z-20 ${
        collapsed ? "w-16" : "w-64"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between p-4 border-b border-cyan-700">
        {!collapsed && (
          <h2 className="text-lg font-bold tracking-wide">Cooperativa</h2>
        )}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-cyan-300 transition"
            aria-label="Alternar barra lateral"
          >
            <i
              className={`fa-solid ${
                collapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {filteredItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path || "#"}
            className="flex items-center gap-3 p-2 rounded hover:bg-cyan-700 transition relative group"
          >
            {item.icon && (
              <i
                className={`${item.icon} w-5 text-center text-base min-w-[20px]`}
              ></i>
            )}
            {!collapsed && <span>{item.label}</span>}

            {/* Tooltip cuando está colapsado */}
            {collapsed && hovered && (
              <span className="absolute left-16 bg-cyan-900 px-2 py-1 rounded shadow-md text-sm whitespace-nowrap hidden group-hover:block">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Pie con logout */}
      {user && (
        <div className="p-4 border-t border-cyan-700">
          <button
            className="flex items-center gap-3 p-2 w-full text-left hover:bg-red-600 rounded transition"
            onClick={() => console.log("Cerrar sesión")}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
