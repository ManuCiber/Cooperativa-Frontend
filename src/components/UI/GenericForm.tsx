import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import type { GenericFormProps } from "../../types/Form";


const GenericForm: React.FC<GenericFormProps> = ({ title, fields, onSubmit, submitText }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || "Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundImage: "url('/assets/form-cooperativa.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 bg-black/20 md:bg-transparent flex items-center justify-center p-4">
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{title}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === "select" ? (
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">{field.label}</label>
                    <select
                      multiple={field.multiple}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
                      value={formData[field.name] || (field.multiple ? [] : "")}
                      onChange={(e) =>
                        handleChange(
                          field.name,
                          field.multiple
                            ? Array.from(e.target.selectedOptions, (option) => option.value)
                            : e.target.value
                        )
                      }
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <Input
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    icon={field.icon}
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white/50 focus:bg-white/20"
                  />
                )}
              </div>
            ))}

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              text={loading ? "Cargando..." : submitText || "Enviar"}
              type="primary"
              disabled={loading}
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              icon={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-paper-plane"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
