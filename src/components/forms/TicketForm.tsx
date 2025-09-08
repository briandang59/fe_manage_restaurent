import { useEffect } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useIngredients } from "@/utils/hooks/useIngredient";
import { FormSelect } from "../forms-component/FormSelect";
import { variables } from "@/utils/constants/common/variables";
import { TicketResponseType } from "@/types/response/ticket";

interface TicketFormProps {
    onSubmit: (data: Partial<TicketResponseType>) => void;
    initialData?: Partial<TicketResponseType>;
    isLoading?: boolean;
    mode: "create" | "update";
}
function TicketForm({ onSubmit, initialData, isLoading }: TicketFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            ingredient_id: "",
            ticket_type: "",
            unit: "",
            quantity: 0,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const { data: ingredientData } = useIngredients(1, 100);

    const ticketTypeOptions = [
        {
            label: "Nhập",
            value: "Import",
        },
        {
            label: "Xuất",
            value: "Export",
        },
    ];
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormSelect
                control={control}
                label="Tên nguyên vật liệu"
                name="ingredient_id"
                errors={errors}
                options={
                    ingredientData?.data.map((item) => ({
                        label: item.name,
                        value: String(item.id),
                    })) || []
                }
                required
            />

            <FormInput
                control={control}
                label="Số lượng"
                name="quantity"
                errors={errors}
                type="number"
                required
            />
            <FormSelect
                control={control}
                label="Đơn vị"
                name="unit"
                errors={errors}
                options={variables.unitOptions}
                required
            />
            <FormSelect
                control={control}
                label="Loại"
                name="ticket_type"
                errors={errors}
                options={ticketTypeOptions}
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

export default TicketForm;
