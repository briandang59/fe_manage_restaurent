import { Controller, FieldValues, RegisterOptions, Path } from "react-hook-form";
import { FormFieldProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> extends FormFieldProps<TFieldValues> {
  options: Option[];
}

export function FormSelect<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  errors,
  options,
  ...rest
}: FormSelectProps<TFieldValues>) {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={name} className="block font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={rules as RegisterOptions<TFieldValues, Path<TFieldValues>>}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            {...rest}
          >
            <SelectTrigger id={name}>
              <SelectValue placeholder={placeholder || label} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500 mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
} 