import { Control, FieldErrors, RegisterOptions, FieldValues, Path } from "react-hook-form";

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errors?: FieldErrors<TFieldValues>;
  [key: string]: unknown;
} 