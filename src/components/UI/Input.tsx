import type { InputProps } from "../../types/Components/Input";

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-2 border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 
        focus-within:ring-2 focus-within:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {icon && <i className={`${icon} text-gray-400`}></i>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default Input;