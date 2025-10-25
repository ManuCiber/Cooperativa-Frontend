import { useEffect, useState } from "react";
import type { Field } from "../../types/Components/Form";
import GenericForm from "../UI/Form";

interface EditModalProps<T extends Record<string, any>> {
  isOpen: boolean;
  data: T | null;
  fields: Field[];
  onClose: () => void;
  onSave: (updated: T) => void;
}

const EditModal = <T extends Record<string, any>>({
  isOpen,
  data,
  fields,
  onClose,
  onSave,
}: EditModalProps<T>) => {
  const [initialValues, setInitialValues] = useState<T | null>(data);

  useEffect(() => {
    setInitialValues(data);
  }, [data]);

  if (!isOpen || !data) return null;

  const handleSubmit = (values: T) => {
    onSave(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Editar</h2>
        {initialValues && (
          <GenericForm<T>
            initialValues={initialValues}
            fields={fields as unknown as any}
            onSubmit={handleSubmit}
          />
        )}
        <div className="mt-4 text-right">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
