export interface NavItem{
    label: string;
    icon?: string;
    onClick?: () => void;
    permission?: string
}

export interface NavbarProps{
    title?: string;
    items?: NavItem[];
    userName?: string;
    avatar?: string;
    onLogout?: () => void;
    onToggleSidebar?: () => void
}