import clsx from "clsx"
import { Children, type ButtonHTMLAttributes, type ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "danger" | "outline"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    variant?: ButtonVariant;
    loading?: boolean;
}

export default function Button ({
    children,
    variant = "primary",
    loading = false,
    className,
    ...props
}: ButtonProps) {
return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all",
        {
          "bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-cyan-300": variant === "primary",
          "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-300": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300": variant === "danger",
          "border border-cyan-600 text-cyan-600 hover:bg-cyan-50": variant === "outline",
        },
        className
      )}
    >
        {loading ? (<span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>):(
            children
        )}
    </button>
    );
}