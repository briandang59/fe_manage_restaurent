import { Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import { FormFieldProps } from "./types";
import { Textarea } from "@/components/ui/textarea";

export function FormArea<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  errors,
  required = false,
  ...rest
}: FormFieldProps<TFieldValues>) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules as RegisterOptions<TFieldValues, Path<TFieldValues>>}
        render={({ field }) => (
          <Textarea
            id={name}
            placeholder={placeholder}
            {...field}
            {...rest}
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500 mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
} 