import React, { type ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = "md",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`bg-white rounded-xl shadow-lg w-full ${sizeClasses[size]} mx-4 animate-fadeIn`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times"></i> {/* FontAwesome ícono de cerrar */}
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t p-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

export default BaseModal;
