import React from "react";
import Button from "../UI/Button"; // Ajusta el import según tu estructura
import type { SuccessModalProps } from "../../types/Components/Modal/MNotificación";


const SuccessModal: React.FC<SuccessModalProps> = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96 transform transition-all animate-fadeIn scale-100">
        {/* Icono circular */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 flex items-center justify-center shadow-inner">
            <i className="fa-regular fa-circle-check text-4xl"></i>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">¡Éxito!</h2>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6 px-4">{message}</p>

        {/* Botón centrado */}
        <div className="flex justify-center">
          <Button
            text="Cerrar"
            onClick={onClose}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
