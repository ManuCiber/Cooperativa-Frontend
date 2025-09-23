// import { useState } from "react";
// import type { NavbarProps } from "../../types/Navbar";
// import { useAuth } from "../../hooks/useAuth";

// const Navbar: React.FC<NavbarProps & { onLogout?: () => void }> = ({
//   title = "Cooperativa",
//   items = [],
//   userName,
//   avatar,
//   onLogout,
// }) => {
//   const { hasPermission, hasRole } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Filtrar items según permisos si se proporciona un campo 'permission'
//   const filteredItems = items.filter((item: any) => {
//     if (!item.permission) return true; // sin permiso requerido
//     return hasPermission(item.permission) || hasRole("admin");
//   });

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
//       {/* Izquierda: título y menú hamburguesa */}
//       <div className="flex items-center gap-4">
//         <span className="font-bold text-lg">{title}</span>

//         {/* Menú desktop */}
//         <div className="hidden md:flex items-center gap-4">
//           {filteredItems.map((item, idx) => (
//             <button
//               key={idx}
//               onClick={item.onClick}
//               className="flex items-center gap-2 hover:text-gray-200 transition"
//             >
//               {item.icon && <i className={`${item.icon}`}></i>}
//               {item.label}
//             </button>
//           ))}
//         </div>

//         {/* Menú hamburguesa mobile */}
//         <button
//           className="md:hidden ml-2 p-2 rounded hover:bg-blue-500 transition"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <i className="fa-solid fa-bars"></i>
//         </button>
//       </div>

//       {/* Derecha: usuario y dropdown */}
//       {userName && (
//         <div className="relative flex items-center gap-2">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center gap-2 focus:outline-none"
//           >
//             {avatar ? (
//               <img
//                 src={avatar}
//                 alt="Perfil"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             ) : (
//               <i className="fa-solid fa-user w-8 h-8 text-white"></i>
//             )}
//             <span>{userName}</span>
//           </button>

//           {/* Dropdown */}
//           {dropdownOpen && (
//             <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
//               <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                 Perfil
//               </li>
//               <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                 Configuración
//               </li>
//               {onLogout && (
//                 <li
//                   className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer flex items-center gap-2"
//                   onClick={onLogout}
//                 >
//                   <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
//                 </li>
//               )}
//             </ul>
//           )}
//         </div>
//       )}

//       {/* Menú mobile */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full bg-blue-600 md:hidden flex flex-col p-4 gap-2 z-40">
//           {filteredItems.map((item, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 item.onClick?.();
//                 setMenuOpen(false);
//               }}
//               className="flex items-center gap-2 hover:text-gray-200 transition"
//             >
//               {item.icon && <i className={`${item.icon}`}></i>}
//               {item.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import { useState } from "react";
// import type { NavbarProps } from "../../types/Navbar";
// import { useAuth } from "../../hooks/useAuth";

// const Navbar: React.FC<NavbarProps> = ({
//   title = "Cooperativa",
//   items = [],
//   userName,
//   avatar,
//   onLogout,
//   onToggleSidebar,
// }) => {
//   const { hasPermission, hasRole } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Filtrar items según permisos
//   const filteredItems = items.filter((item: any) => {
//     if (!item.permission) return true;
//     return hasPermission(item.permission) || hasRole("admin");
//   });

//   return (
//     <nav className="bg-gradient-to-r from-cyan-700 to-blue-900 text-white px-6 py-3 flex items-center justify-between shadow-md relative">
//       {/* Izquierda: botón hamburguesa + título */}
//       <div className="flex items-center gap-4">
//         {onToggleSidebar && (
//           <button
//             onClick={onToggleSidebar}
//             className="text-white hover:text-cyan-300 transition md:hidden"
//           >
//             <i className="fa-solid fa-bars text-xl"></i>
//           </button>
//         )}
//         <span className="font-bold text-lg">{title}</span>

//         {/* Menú desktop */}
//         <div className="hidden md:flex items-center gap-4">
//           {filteredItems.map((item, idx) => (
//             <button
//               key={idx}
//               onClick={item.onClick}
//               className="flex items-center gap-2 hover:text-cyan-300 transition"
//             >
//               {item.icon && <i className={`${item.icon}`}></i>}
//               {item.label}
//             </button>
//           ))}
//         </div>

//         {/* Menú hamburguesa mobile */}
//         <button
//           className="md:hidden ml-2 p-2 rounded hover:bg-cyan-600 transition"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <i className="fa-solid fa-bars"></i>
//         </button>
//       </div>

//       {/* Derecha: usuario con dropdown */}
//       {userName && (
//         <div className="relative flex items-center gap-2">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="flex items-center gap-2 focus:outline-none"
//           >
//             {avatar ? (
//               <img
//                 src={avatar}
//                 alt="Perfil"
//                 className="w-8 h-8 rounded-full border-2 border-cyan-400 object-cover"
//               />
//             ) : (
//               <i className="fa-solid fa-circle-user text-2xl"></i>
//             )}
//             <span className="hidden sm:inline">{userName}</span>
//           </button>

//           {/* Dropdown */}
//           {dropdownOpen && (
//             <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
//               <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                 Perfil
//               </li>
//               <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
//                 Configuración
//               </li>
//               {onLogout && (
//                 <li
//                   className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer flex items-center gap-2"
//                   onClick={onLogout}
//                 >
//                   <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
//                 </li>
//               )}
//             </ul>
//           )}
//         </div>
//       )}

//       {/* Menú mobile */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full bg-gradient-to-r from-cyan-700 to-blue-900 md:hidden flex flex-col p-4 gap-2 z-40">
//           {filteredItems.map((item, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 item.onClick?.();
//                 setMenuOpen(false);
//               }}
//               className="flex items-center gap-2 hover:text-cyan-300 transition"
//             >
//               {item.icon && <i className={`${item.icon}`}></i>}
//               {item.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import type { NavbarProps } from "../../types/Navbar";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC<NavbarProps & { onLogout?: () => void }> = ({
  title = "Cooperativa",
  items = [],
  userName,
  avatar,
  onLogout,
}) => {
  const { hasPermission, hasRole } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Filtrar items según permisos/roles
  const filteredItems = items.filter((item: any) => {
    if (!item.permission) return true; 
    return hasPermission(item.permission) || hasRole("admin");
  });

  return (
    <nav className="bg-cyan-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* IZQUIERDA - título y menú hamburguesa */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg tracking-wide">{title}</span>

        {/* Menú desktop */}
        <div className="hidden md:flex items-center gap-4">
          {filteredItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              className="flex items-center gap-2 hover:text-cyan-200 transition"
            >
              {item.icon && <i className={`${item.icon}`}></i>}
              {item.label}
            </button>
          ))}
        </div>

        {/* Botón hamburguesa - solo móvil */}
        <button
          className="md:hidden ml-2 p-2 rounded hover:bg-cyan-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* DERECHA - usuario y dropdown */}
      {userName && (
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Perfil"
                className="w-8 h-8 rounded-full object-cover border border-white"
              />
            ) : (
              <i className="fa-solid fa-user w-8 h-8 text-white"></i>
            )}
            <span className="hidden sm:inline">{userName}</span>
            <i
              className={`fa-solid fa-chevron-down transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            ></i>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-900 dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                Perfil
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                Configuración
              </li>
              {onLogout && (
                <li
                  className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer flex items-center gap-2"
                  onClick={onLogout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Cerrar sesión
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* MENÚ MOBILE */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-cyan-700 md:hidden flex flex-col p-4 gap-2 z-40">
          {filteredItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick?.();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 hover:text-cyan-200 transition"
            >
              {item.icon && <i className={`${item.icon}`}></i>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
