import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { PermissionResponse } from "@/types/response/permission";

interface PermissionFormProps {
    onSubmit: (data: Partial<PermissionResponse>) => void;
    initialData?: Partial<PermissionResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function PermissionForm({ onSubmit, initialData, isLoading }: PermissionFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<PermissionResponse>({
        defaultValues: {
            permission_name: "",
            roles: [],
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
                label="Tên quyền"
                name="permission_name"
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

export default PermissionForm;
