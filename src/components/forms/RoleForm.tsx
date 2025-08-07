import { useEffect, useState } from "react";
import { FormInput } from "../forms-component/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { usePermissions } from "@/utils/hooks/usePermission";
import { RoleResponse } from "@/types/response/roles";
import { Checkbox } from "../ui/checkbox";

interface RoleFormProps {
    onSubmit: (data: Partial<RoleResponse>) => void;
    initialData?: Partial<RoleResponse>;
    isLoading?: boolean;
    mode: "create" | "update";
}

function RoleForm({ onSubmit, initialData, isLoading }: RoleFormProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(() => {
        if (!initialData?.permissions) return [];
        return initialData.permissions.map((p) => (typeof p === "number" ? p : p.id));
    });
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
            reset({
                ...initialData,
                permissions: initialData.permissions || [],
            });
            const newPermissions = initialData.permissions
                ? initialData.permissions.map((p) => (typeof p === "number" ? p : p.id))
                : [];
            setSelectedPermissions(newPermissions);
        }
    }, [initialData, reset]);

    const { data: permissionData } = usePermissions(1, 100);

    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        setSelectedPermissions((prev) => {
            if (checked) {
                return [...prev, permissionId];
            } else {
                return prev.filter((id) => id !== permissionId);
            }
        });
    };

    const handleFormSubmit = (data: RoleResponse) => {
        onSubmit({
            ...data,
            permissions: selectedPermissions,
        });
    };
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormInput
                control={control}
                label="Tên vai trò"
                name="role_name"
                errors={errors}
                required
            />

            <div className="max-h-[600px] space-y-2 overflow-y-auto">
                <label className="font-medium">Quyền hạn</label>
                <div className="grid grid-cols-2 gap-4">
                    {permissionData?.data.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`permission-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={(checked) =>
                                    handlePermissionChange(permission.id, checked as boolean)
                                }
                            />
                            <label
                                htmlFor={`permission-${permission.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {permission.permission_name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang tải..." : "Lưu"}
                </Button>
            </div>
        </form>
    );
}

export default RoleForm;
