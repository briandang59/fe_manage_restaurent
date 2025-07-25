import { Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import { FormFieldProps } from "./types";

export function FormTimePicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  errors,
  ...rest
}: FormFieldProps<TFieldValues>) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={name} className="block font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules as RegisterOptions<TFieldValues, Path<TFieldValues>>}
        render={({ field }) => (
          <input
            id={name}
            type="time"
            placeholder={placeholder}
            className="input input-bordered w-full"
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