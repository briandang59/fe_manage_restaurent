import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { TableResponse } from "@/types/response/table";

interface TableFormProps {
    onSubmit: (data: Partial<TableResponse>) => void;
    initialData?: Partial<TableResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function TableForm({ onSubmit, initialData, isLoading }: TableFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TableResponse>({
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput control={control} label="Tên bàn" name="name" errors={errors} required />

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang tải..." : "Lưu"}
                </Button>
            </div>
        </form>
    );
}

export default TableForm;
