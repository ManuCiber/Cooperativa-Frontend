import React from "react";
import { useForm } from "../../hooks/useForm";
import type { FieldConfig } from "../../types/Components/Form";

interface GenericFormProps<T> {
  initialValues: T;
  fields: FieldConfig[];
  onSubmit: (values: T) => void;
}

export const GenericForm = <T extends Record<string, any>>({
  initialValues,
  fields,
  onSubmit,
}: GenericFormProps<T>) => {
  const { formValues, handleChange, resetForm } = useForm<T>(initialValues);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formValues[field.name];
      if (field.validation?.required && !value) {
        newErrors[field.name] = "Este campo es obligatorio";
      } else if (field.validation?.minLength && value.length < field.validation.minLength) {
        newErrors[field.name] = `Debe tener al menos ${field.validation.minLength} caracteres`;
      } else if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        newErrors[field.name] = `Debe tener como máximo ${field.validation.maxLength} caracteres`;
      } else if (field.validation?.pattern && !field.validation.pattern.test(value)) {
        newErrors[field.name] = "Formato inválido";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formValues);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => {
        const value = formValues[field.name];
        const error = errors[field.name];

        switch (field.type as any) {
          case "text":
          case "email":
          case "password":
          case "number":
            return (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          case "textarea":
            return (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.label}</label>
                <textarea
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          case "select":
            return (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.label}</label>
                <select
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Seleccione</option>
                  {field.options?.map((option) => {
                    const isString = typeof option === "string";
                    const optValue = isString ? option : String((option as any).value);
                    const optLabel = isString ? option : (option as any).label ?? optValue;
                    return (
                      <option key={optValue} value={optValue}>
                        {optLabel}
                      </option>
                    );
                  })}
                </select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          case "checkbox":
            return (
              <div key={field.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!value}
                  onChange={(e) =>
                    handleChange({
                      ...e,
                      target: { ...e.target, value: e.target.checked },
                    } as any)
                  }
                  className="h-5 w-5"
                />
                <label className="text-gray-700">{field.label}</label>
              </div>
            );

          case "radio":
            return (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">{field.label}</label>
                <div className="flex gap-4">
                  {field.options?.map((option) => {
                    const isString = typeof option === "string";
                    const optValue = isString ? option : String((option as any).value);
                    const optLabel = isString ? option : (option as any).label ?? optValue;
                    return (
                      <label key={optValue} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={field.name}
                          value={optValue}
                          checked={String(value) === optValue}
                          onChange={handleChange}
                        />
                        {optLabel}
                      </label>
                    );
                  })}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          default:
            return null;
        }
      })}

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default GenericForm;