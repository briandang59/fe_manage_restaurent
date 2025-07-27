import { Controller, FieldValues } from "react-hook-form";
import { FormFieldProps } from "./types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function FormDatepicker<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules = {},
  required = false,
  errors,
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
        rules={rules}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={field.value ? "default" : "outline"}
                className="w-full justify-start text-left font-normal"
              >
                {field.value ? format(field.value, "dd/MM/yyyy") : (placeholder || "Chọn ngày")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                {...rest}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {errors?.[name] && (
        <p className="text-sm text-red-500 mt-1">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
} 