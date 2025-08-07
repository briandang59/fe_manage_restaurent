import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { FormSelect } from "../forms-component/FormSelect";
import { FormDatepicker } from "../forms-component/FormDatepicker";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { AttendanceResponse } from "@/types/response/attendance";

interface AttendanceFormProps {
    onSubmit: (data: Partial<AttendanceResponse>) => void;
    initialData?: Partial<AttendanceResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function AttendanceForm({ onSubmit, initialData, isLoading }: AttendanceFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AttendanceResponse>({
        defaultValues: {
            employee_id: 0,
            date: "",
            status: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const statusOptions = [
        { label: "Có mặt", value: "present" },
        { label: "Vắng", value: "absent" },
        { label: "Muộn", value: "late" },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
                control={control}
                label="ID Nhân viên"
                name="employee_id"
                type="number"
                errors={errors}
                required
            />

            <FormDatepicker control={control} label="Ngày" name="date" errors={errors} required />

            <FormSelect
                control={control}
                label="Trạng thái"
                name="status"
                options={statusOptions}
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

export default AttendanceForm;
