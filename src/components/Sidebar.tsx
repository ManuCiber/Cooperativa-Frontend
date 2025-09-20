import { useState } from "react"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div
        className={`${isOpen ? "w-60": "w-20"} h-screen bg-cyan-700 text-white flex flex-col transition-all duration-300`}
        >
            <button className="p-4 hover:bg-cyan-600" onClick={()=> setIsOpen(!isOpen)}>
                {isOpen? "<": ">"}
            </button>

            <nav className="flex flex-col gap-2 mt-4">
                <a className="flex items-center gap-3 p-3 hover: bg-cyan-600" href="#">
                    <i className="fas fa-house"></i>
                    {isOpen && <span>Dashboard</span>}
                </a>
                <a className="flex items-center gap-3 p-3 hover: bg-cyan-600" href="#">
                    <i className="fas fa-users"></i>
                    {isOpen && <span>Socios</span>}
                </a>
                <a className="flex items-center gap-3 p-3 hover: bg-cyan-600" href="#">
                    <i className="fas fa-dolar-sign"></i>
                    {isOpen && <span>Aportes</span>}
                </a>
                <a className="flex items-center gap-3 p-3 hover: bg-cyan-600" href="#">
                    <i className="fas fa-chart-pie"></i>
                    {isOpen && <span>Prestamos</span>}
                </a>
                <a className="flex items-center gap-3 p-3 hover: bg-cyan-600" href="#">
                    <i className="fas fa-gear"></i>
                    {isOpen && <span>Configuracion</span>}
                </a>
            </nav>
        </div>
    )
}

export default Sidebar;