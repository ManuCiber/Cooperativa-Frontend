import type { ButtonProps } from "../../types/Button";

// const Button: React.FC<ButtonProps> =({
//   text, onClick, type="primary", icon, disabled=true, className=""
// }) => {
//     const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition"
// }

const Button: React.FC<ButtonProps> = ({
  text, onClick, type = "primary", icon, disabled = false, className = ''
}) => {
  const baseStyle = 'flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition';

  const typeStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover: bg-gray-300',
    danger: 'bg-red-600 text-white hover: bg-red-700',
  };
  return(
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${typeStyle[type]} ${disabled ? 'opacity-50 cursor-not-allowed': '' } ${className}`}
    >
      {icon && <i className={`${icon}`}></i>}
      {text}
    </button>
  )
}

export default Button