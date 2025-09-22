import { NavLink } from "react-router-dom";
import type { SidebarProps } from "../../types/Sidebar";

const Sidebar: React.FC<SidebarProps> = ({
    items, collapsed = false
}) => {
    return(
        <aside 
            className={`bg-gray-800 text-white h-full p-4 flex flex-col gap-2 transition-all ${collapsed? 'w-20': "w-64"}`}
        >
            {items.map(
                (items, idx) => (
                    <NavLink key={idx}
                    to={items.path}
                    className={
                        ({isActive}) => `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition ${isActive? "bg-gray-700": ""}`
                    }
                    >
                        {items.icon && <i className={`${items.icon}`}></i>}
                        {!collapsed && <span>{items.label}</span>}
                    </NavLink>
                )
            )}
        </aside>
    )
}

export default Sidebar;