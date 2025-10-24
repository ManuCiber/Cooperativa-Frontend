export const dashboardRoutes = [
    {
        path: "home",
        label: "Inicio",
        icon: "fa-solid fa-house",
        element: "<div>Home</div>",
        roles:["admin", "gerente", "cajero", "oficial de negocios", "oficial de servicios"],
    },
    {
        path: "usuarios",
        label: "Usuarios",
        icon: "fa-solid fa-users",
        element: "<div>Usuarios</div>",
        roles:["admin", "gerente"],
    },
    {
        path: "prestamos",
        label: "Prestamos",
        icon: "fa-solid fa-hand-holding-dollar",
        element: "<div>Home</div>",
        roles:["admin", "gerente", "oficial de negocios"],
    },
    {
        path: "aportes",
        label: "Aportes",
        icon: "fa-solid fa-piggy-bank",
        element: "<div>Home</div>",
        roles:["admin", "gerente", "cajero", "oficial de servicios"],
    },
    {
        path: "socios",
        label: "Socios",
        icon: "fa-solid fa-house",
        element: "<div>Home</div>",
        roles:["admin", "gerente"],
    },
]