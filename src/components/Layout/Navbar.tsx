import type { NavbarProps } from "../../types/Navbar";

const Navbar: React.FC<NavbarProps> = ({
    title = "Cooperativa", items =[], userName
}) => {
    return(
        <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
                <span className="font-bold text-lg">{title}</span>
                {items.map(
                    (item, idx) => (
                        <button key={idx}
                        onClick={item.onClick}
                        className="flex items-center gap-2 hover:text-gray-200 transition">
                            {item.icon && <i className={`${item.icon}`}></i>}
                            {item.label}
                        </button>
                    )
                )}
            </div>
            {userName && (
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-user"></i>
                    <span>{userName}</span>
                </div>
            )}
        </nav>
    )
}

export default Navbar;