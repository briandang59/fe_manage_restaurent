import { Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import { FormFieldProps } from "./types";
import { Checkbox } from "@/components/ui/checkbox";

export function FormCheckbox<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  rules,
  errors,
  disabled,
  type, // loại khỏi rest
  ...rest
}: FormFieldProps<TFieldValues> & { disabled?: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={name}
        control={control}
        rules={rules as RegisterOptions<TFieldValues, Path<TFieldValues>>}
        render={({ field }) => {
          // Loại bỏ type khỏi fieldProps
          const { type: _type, ...fieldProps } = field as typeof field & { type?: unknown };
          return (
            <Checkbox
              id={name}
              {...fieldProps}
              disabled={!!disabled}
              {...rest}
            />
          );
        }}
      />
      {label && <label htmlFor={name} className="font-medium select-none cursor-pointer">{label}</label>}
      {errors?.[name] && (
        <p className="text-sm text-red-500 mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
} 