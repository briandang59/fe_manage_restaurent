import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Controller, FieldValues } from "react-hook-form";
import { FormFieldProps } from "./types";
import { Eye, EyeOff } from "lucide-react";

export function FormInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  rules,
  errors,
  required,
  ...rest
}: FormFieldProps<TFieldValues>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Input
              id={name}
              placeholder={placeholder}
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              {...field}
              {...rest}
            />
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {errors?.[name] && (
        <p className="text-sm text-red-500 mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}