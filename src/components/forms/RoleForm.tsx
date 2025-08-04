import { useEffect, useState } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { usePermissions } from "@/utils/hooks/usePermission";
import { RoleResponse } from "@/types/response/roles";
import { FormSelectWithPagination } from "../forms-component/FormSelectWithPagination";

interface RoleFormProps {
    onSubmit: (data: Partial<RoleResponse>) => void;
    initialData?: Partial<RoleResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function RoleForm({ onSubmit, initialData, isLoading }: RoleFormProps) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<RoleResponse>({
        defaultValues: {
            role_name: "",
            permissions: [],
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const [permissionPage, setPermissionPage] = useState<number>(1);
    const [rolePageSize] = useState<number>(10);
    const { data: permissionData } = usePermissions(permissionPage, rolePageSize);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
                control={control}
                label="Họ và tên"
                name="role_name"
                errors={errors}
                required
            />

            <FormSelectWithPagination
                control={control}
                label="Vai trò"
                name="permissions"
                options={
                    permissionData?.data.map((item) => ({
                        label: item.permission_name,
                        value: item.id.toString(),
                    })) || []
                }
                errors={errors}
                required
                searchable={true}
                hasMore={
                    permissionData?.pagination
                        ? permissionPage <
                          Math.ceil(
                              permissionData.pagination.total / permissionData.pagination.page_size
                          )
                        : false
                }
                isLoading={false}
                onLoadMore={(page) => {
                    setPermissionPage(page);
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

export default RoleForm;
