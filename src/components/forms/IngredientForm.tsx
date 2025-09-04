import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { IngredientResponse } from "@/types/response/ingredients";
import { FormSelect } from "../forms-component/FormSelect";
import { variables } from "@/utils/constants/common/variables";

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
            description: "",
            warning_quantity: 0,
            supplier: "",
            unit: "",
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
            <FormInput control={control} label="Mô tả" name="description" errors={errors} />

            <FormInput
                control={control}
                label="Số lượng"
                name="quantity"
                type="number"
                errors={errors}
            />
            <FormInput
                control={control}
                label="Số lượng báo động"
                name="warning_quantity"
                type="number"
                errors={errors}
                required
            />
            <FormInput control={control} label="Nhà cung cấp" name="supplier" errors={errors} />

            <FormSelect
                control={control}
                label="Đơn vị"
                name="unit"
                errors={errors}
                options={variables.unitOptions}
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
