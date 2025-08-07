import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { CustomerResponse } from "@/types/response/customer";

interface CustomerFormProps {
    onSubmit: (data: Partial<CustomerResponse>) => void;
    initialData?: Partial<CustomerResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function CustomerForm({ onSubmit, initialData, isLoading }: CustomerFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<CustomerResponse>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
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
                label="Tên khách hàng"
                name="name"
                errors={errors}
                required
            />

            <FormInput
                control={control}
                label="Email"
                name="email"
                type="email"
                errors={errors}
                required
            />

            <FormInput
                control={control}
                label="Số điện thoại"
                name="phone"
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

export default CustomerForm;
