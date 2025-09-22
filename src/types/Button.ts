export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'primary' | 'secondary' | 'danger';
    icon?: string; // clase de FontAwesome: "fa-solid fa-plus"
    disabled?: boolean;
    className?: string;
}