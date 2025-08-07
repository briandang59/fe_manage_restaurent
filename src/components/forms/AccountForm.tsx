import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { AccountResponse } from "@/types/response/account";

interface AccountFormProps {
    onSubmit: (data: Partial<AccountResponse>) => void;
    initialData?: Partial<AccountResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function AccountForm({ onSubmit, initialData, isLoading }: AccountFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<AccountResponse>({
        defaultValues: {
            user_name: "",
            role_id: 0,
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
                label="Tên người dùng"
                name="user_name"
                errors={errors}
                required
            />

            <FormInput
                control={control}
                label="ID Vai trò"
                name="role_id"
                type="number"
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

export default AccountForm;
