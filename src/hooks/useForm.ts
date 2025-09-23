import { useState } from "react"

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
    const [formValues, setFormValues] = useState<T>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const resetForm = () => setFormValues(initialValues);

  return {formValues, handleChange, resetForm, setFormValues}
}