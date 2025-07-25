import { Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import { FormFieldProps } from "./types";

interface Option {
  label: string;
  value: string;
}

interface FormRadioProps<TFieldValues extends FieldValues = FieldValues> extends FormFieldProps<TFieldValues> {
  options: Option[];
}

export function FormRadio<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  rules,
  errors,
  options,
  ...rest
}: FormRadioProps<TFieldValues>) {
  return (
    <div className="space-y-1">
      {label && <div className="block font-medium mb-1">{label}</div>}
      <Controller
        name={name}
        control={control}
        rules={rules as RegisterOptions<TFieldValues, Path<TFieldValues>>}
        render={({ field }) => (
          <div className="flex gap-4">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value={opt.value}
                  checked={field.value === opt.value}
                  onChange={() => field.onChange(opt.value)}
                  {...rest}
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500 mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
} 