import React from "react";
import Button from "../UI/Button"; // Ajusta el import según tu estructura
import type { ConfirmModalProps } from "../../types/Components/Modal/MConfirmacion";


const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title = "Confirmar acción",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96 transform transition-all animate-fadeIn scale-100">
        {/* Icono circular */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 rounded-full w-20 h-20 flex items-center justify-center shadow-inner">
            <i className="fa-solid fa-triangle-exclamation text-4xl"></i>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6 px-4">{message}</p>

        {/* Botones centrados */}
        <div className="flex justify-center gap-4">
          <Button
            text="Cancelar"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition duration-200"
          />
          <Button
            text="Eliminar"
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
