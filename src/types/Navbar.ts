export interface NavItem{
    label: string;
    icon?: string;
    onClick?: () => void;
}

export interface NavbarProps{
    title?: string;
    items?: NavItem[];
    userName?: string;
}