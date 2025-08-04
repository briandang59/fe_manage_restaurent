import { useForm } from "react-hook-form";
import { FormInput } from "../forms-component/FormInput";
import { FormArea } from "../forms-component/FormArea";
import { FormSelect } from "../forms-component/FormSelect";
import { FormSelectWithPagination } from "../forms-component/FormSelectWithPagination";
import { FormDatepickerOptimized } from "../forms-component/FormDatepickerOptimized";
import { StaffResponse } from "@/types/response/staff";
import { useEffect, useState } from "react";
import { FormRadio } from "../forms-component/FormRadio";
import { Button } from "../ui/button";
import { useRoles } from "@/utils/hooks/useRole";

type StaffFormData = Partial<StaffResponse> & { role_id?: number };

interface StaffFormProps {
  onSubmit: (data: StaffFormData) => void;
  isLoading: boolean;
  initialData?: StaffResponse | null;
}

function StaffForm({ onSubmit, isLoading, initialData }: StaffFormProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<StaffFormData>({
    defaultValues: {
      full_name: "",
      gender: undefined,
      birthday: "",
      phone_number: "",
      email: "",
      schedule_type: "",
      address: "",
      join_date: "",
      base_salary: 0,
      salary_per_hour: 0,
      role_id: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [rolePage, setRolePage] = useState<number>(1);
  const [rolePageSize] = useState<number>(10);
  const [roleSearch, setRoleSearch] = useState<string>("");
  const { data: roleData } = useRoles(rolePage, rolePageSize, roleSearch);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput control={control} label="Họ và tên" name="full_name" errors={errors} required />

      <div className="grid grid-cols-2 gap-2">
        <FormRadio
          control={control}
          label="Giới tính"
          name="gender"
          errors={errors}
          options={[
            { value: "true", label: "Nam" },
            { value: "false", label: "Nữ" },
          ]}
        />
      </div>

      <FormDatepickerOptimized
        control={control}
        label="Ngày sinh"
        name="birthday"
        errors={errors}
      />

      <FormInput
        control={control}
        label="Số điện thoại"
        name="phone_number"
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

      <FormSelect
        control={control}
        label="Loại lịch làm việc"
        name="schedule_type"
        options={[
          { value: "full_time", label: "Toàn thời gian" },
          { value: "part_time", label: "Bán thời gian" },
        ]}
        errors={errors}
        required
      />

      <FormArea control={control} label="Địa chỉ" name="address" errors={errors} />

      <FormDatepickerOptimized
        control={control}
        label="Ngày vào làm"
        name="join_date"
        errors={errors}
      />

      <FormInput
        control={control}
        label="Lương cơ bản (VNĐ)"
        name="base_salary"
        type="number"
        errors={errors}
      />

      <FormInput
        control={control}
        label="Lương theo giờ (VNĐ)"
        name="salary_per_hour"
        type="number"
        errors={errors}
      />
      <FormSelectWithPagination
        control={control}
        label="Vai trò"
        name="role_id"
        options={
          roleData?.data.map((item) => ({
            label: item.role_name,
            value: item.id.toString(),
          })) || []
        }
        errors={errors}
        required
        searchable={true}
        hasMore={
          roleData?.pagination
            ? rolePage < Math.ceil(roleData.pagination.total / roleData.pagination.page_size)
            : false
        }
        isLoading={false}
        onLoadMore={(page, search) => {
          setRolePage(page);
          setRoleSearch(search || "");
        }}
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang tải..." : "Lưu"}
        </Button>
      </div>
    </form>
  );
}

export default StaffForm;
