import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import type { GenericFormProps } from "../../types/Form";

const GenericForm: React.FC<GenericFormProps> = ({
  title,
  fields,
  onSubmit,
  submitText,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach((name) => {
        if (
          dropdownRefs.current[name] &&
          !dropdownRefs.current[name]!.contains(event.target as Node)
        ) {
          setOpenDropdown((prev) => ({ ...prev, [name]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
      style={{
        backgroundImage: "url('/assets/form-cooperativa.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#00D3D3",
      }}
    >
      <div className="w-full max-w-lg sm:max-w-md md:max-w-md lg:max-w-lg xl:max-w-xl bg-black/20 dark:bg-transparent flex items-center justify-center p-4 rounded-xl">
        <div className="w-full bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/20 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            {title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-8">
            {fields.map((field) => (
              <div
                key={field.name}
                ref={(el) => {
                  if (field.type === "select") dropdownRefs.current[field.name] = el;
                }}
              >
                {field.type === "select" ? (
                  <div className="relative">
                    <label className="block text-sm sm:text-base font-medium text-white/90 mb-1 sm:mb-2">
                      {field.label}
                    </label>

                    <div
                      className={`w-full p-2 sm:p-3 rounded-lg cursor-pointer flex justify-between items-center
                                  bg-white/80 dark:bg-[#001414]/70
                                  border border-[#00D3D3]/50
                                  text-gray-800 dark:text-white
                                  focus-within:border-[#00FFFF]
                                  backdrop-blur-sm transition-all duration-300 text-sm sm:text-base`}
                      onClick={() =>
                        setOpenDropdown((prev) => ({
                          ...prev,
                          [field.name]: !prev[field.name],
                        }))
                      }
                      tabIndex={0}
                    >
                      <span className="truncate">
                        {formData[field.name]
                          ? field.options?.find((o) => o.value === formData[field.name])
                              ?.label
                          : "Selecciona una opción"}
                      </span>
                      <i
                        className={`fa-solid fa-chevron-down transition-transform duration-300 ${
                          openDropdown[field.name] ? "rotate-180" : ""
                        }`}
                      ></i>
                    </div>

                    {openDropdown[field.name] && (
                      <ul className="absolute z-20 mt-1 sm:mt-2 w-full rounded-lg shadow-lg border border-[#00D3D3]/40 bg-white dark:bg-gray-800 overflow-hidden animate-fadeIn max-h-60 sm:max-h-64 overflow-y-auto">
                        {field.options?.map((opt) => (
                          <li
                            key={opt.value}
                            className="px-3 sm:px-4 py-2 cursor-pointer text-gray-800 dark:text-white hover:bg-[#00D3D3] hover:text-black transition-colors text-sm sm:text-base"
                            onClick={() => {
                              handleChange(field.name, opt.value);
                              setOpenDropdown((prev) => ({ ...prev, [field.name]: false }));
                            }}
                          >
                            {opt.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Input
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    icon={field.icon}
                    className="bg-white/80 dark:bg-[#001414]/70 border-[#00D3D3]/40 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:border-[#00FFFF] focus:bg-[#00D3D3]/20 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
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
              className="w-full bg-[#00D3D3]/30 hover:bg-[#00D3D3]/50 border border-[#00D3D3]/40 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              icon={loading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-paper-plane"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;
