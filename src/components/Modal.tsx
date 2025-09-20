import type { ModalProps } from "../types/Modal";

export default function Modal({
    isOpen, onClose, title, children
}: ModalProps) {
    if(!isOpen){return null}

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative"> 
                {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
                {children}
                <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                > X </button>
            </div>
        </div>
    )
}