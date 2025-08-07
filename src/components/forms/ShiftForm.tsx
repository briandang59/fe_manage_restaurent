import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { FormTimePicker } from "../forms-component/FormTimePicker";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ShiftResponse } from "@/types/response/shift";

interface ShiftFormProps {
    onSubmit: (data: Partial<ShiftResponse>) => void;
    initialData?: Partial<ShiftResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function ShiftForm({ onSubmit, initialData, isLoading }: ShiftFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ShiftResponse>({
        defaultValues: {
            shift_name: "",
            start_time: "",
            end_time: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
                control={control}
                label="Tên ca làm việc"
                name="shift_name"
                errors={errors}
                required
            />

            <FormTimePicker
                control={control}
                label="Thời gian bắt đầu"
                name="start_time"
                errors={errors}
                required
            />

            <FormTimePicker
                control={control}
                label="Thời gian kết thúc"
                name="end_time"
                errors={errors}
                required
            />

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang tải..." : "Lưu"}
                </Button>
            </div>
        </form>
    );
}

export default ShiftForm;
