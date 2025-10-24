export type FieldType = "text" | "email" | "password" | "number" | "date" | "select" | "textarea" | "checkbox" | "radio" | "file";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  icon?: string;
  placeholder?: string;
  options?: { label: string; value: string | number }[]; // ✅ para selects, radios
  required?: boolean;
}

export interface GenericFormProps<T> {
  intialValues: T;
  fields: Field[] | FieldConfig[];
  onSubmit: (values: T) => void; 
}



export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface FieldConfig {
  name: string; // nombre del campo, debe coincidir con la propiedad del objeto de formulario
  label: string; // etiqueta para mostrar
  type: "text" | "email" | "password" | "select" | "textarea" | "checkbox" | "radio"; // tipo de campo
  options?: string[]; // para select, checkbox o radio
  validation?: ValidationRules; // reglas de validación
}