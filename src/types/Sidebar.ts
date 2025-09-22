export interface SidebarItem {
    label: string;
    icon?: string; // clase FontAwesome
    path: string;
}

export interface SidebarProps {
    items: SidebarItem[];
    collapsed?: boolean;
}