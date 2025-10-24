export interface SidebarItem {
    label: string;
    icon?: string; // clase FontAwesome
    path: string;
    permission?: string; // permiso requerido para ver el ítem
}

export interface SidebarProps {
    items?: SidebarItem[];
    collapsed?: boolean;
    sidebarOpen?: boolean;
}