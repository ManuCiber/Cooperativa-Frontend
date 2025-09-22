import type { ModalProps } from "../../types/Modal";

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md"
}) => {
    if(!isOpen){
        return null;
    }
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg'
    };
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white rounded-lg w-full ${sizeClasses[size]} p-6 relative`}>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Modal;
