import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { IngredientResponse } from "@/types/response/ingredients";

interface IngredientFormProps {
    onSubmit: (data: Partial<IngredientResponse>) => void;
    initialData?: Partial<IngredientResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function IngredientForm({ onSubmit, initialData, isLoading }: IngredientFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<IngredientResponse>({
        defaultValues: {
            name: "",
            quantity: 0,
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
                label="Tên nguyên liệu"
                name="name"
                errors={errors}
                required
            />

            <FormInput
                control={control}
                label="Số lượng"
                name="quantity"
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

export default IngredientForm;
