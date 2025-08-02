import { useForm } from "react-hook-form";
import { FormInput } from "../forms-component/FormInput";
import { FormSelect } from "../forms-component/FormSelect";
import { FormArea } from "../forms-component/FormArea";
import { FormAttachment } from "../forms-component/FormAttachment";
import { Button } from "@/components/ui/button";
import { MenuItemResponse } from "@/types/response/menuItem";

interface MenuItemFormProps {
  onSubmit: (data: Partial<MenuItemResponse>) => void;
  initialData?: Partial<MenuItemResponse>;
  isLoading?: boolean;
  mode: "create" | "update";
}

const statusOptions = [
  { value: "Available", label: "Có sẵn" },
  { value: "Stop", label: "Dừng bán" },
  { value: "Out of stock", label: "Hết hàng" },
];

export function MenuItemForm({ onSubmit, initialData, isLoading, mode }: MenuItemFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<MenuItemResponse>>({
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      status: "Available",
      file_id: null,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        control={control}
        label="Tên món ăn"
        name="name"
        errors={errors}
        required
        disabled={isLoading}
      />

      <FormArea
        control={control}
        label="Mô tả"
        name="description"
        errors={errors}
        disabled={isLoading}
      />

      <FormInput
        control={control}
        label="Giá (VNĐ)"
        name="price"
        type="number"
        errors={errors}
        required
        disabled={isLoading}
      />

      <FormSelect
        control={control}
        label="Trạng thái"
        name="status"
        options={statusOptions}
        errors={errors}
        required
        disabled={isLoading}
      />

      <FormAttachment
        control={control}
        label="Hình ảnh"
        name="file_id"
        errors={errors.file_id}
        disabled={isLoading}
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : mode === "create" ? "Tạo mới" : "Cập nhật"}
        </Button>
      </div>
    </form>
  );
}
