const Navbar = () => {
    return(
        <header className="w-full bg-white shadow flex justify-between items-center px-6 py-3">
            <h1 className="text-xl font-bold text-cyan-700 flex items-center gap-2">
                <i className="fas fa-building-columns"></i>
                Cooperativa
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-700">Hola, Admin</span>
                <i className="fas-fa-user-circle text-2xl text-cyan-700"></i>
            </div>
        </header>    
    )
}

export default Navbar;