export type FieldType = "text" | "email" | "password" | "number" | "date" | "select";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  icon?: string;
  placeholder?: string;
  options?: { label: string; value: string | number }[]; // ✅ para selects
  multiple?: boolean; // ✅ para elegir varios roles
}

export interface GenericFormProps {
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitText?: string;
}
