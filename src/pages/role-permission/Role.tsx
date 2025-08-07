import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import RoleForm from "@/components/forms/RoleForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createRoleColumns } from "@/utils/constants/cols/roleCols";
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from "@/utils/hooks/useRole";
import { useState } from "react";
import { RoleResponse } from "@/types/response/roles";
import { toast } from "sonner";

function Role() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<RoleResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: roleData, isLoading, error } = useRoles(page, pageSize);
    const createMutation = useCreateRole();
    const updateMutation = useUpdateRole();
    const deleteMutation = useDeleteRole();
    const roleItem = roleData?.data || [];
    const paginationData = roleData?.pagination;
    const totalPages = paginationData
        ? Math.ceil(paginationData.total / paginationData.page_size)
        : 1;
    const totalItems = paginationData?.total || 0;

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }
    const handleSubmitRole = async (data: Partial<RoleResponse>) => {
        if (!data.role_name || !data.permissions) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            // Chuyển đổi permissions thành mảng ID
            const permissionIds = data.permissions.map((p) => (typeof p === "number" ? p : p.id));

            const commonData = {
                role_name: data.role_name,
                permissions: permissionIds,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật vai trò thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo vai trò thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý vai trò");
        }
    };

    const handleDeleteRole = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa vai trò thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa vai trò");
        }
    };
    const roleCols = createRoleColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteRole,
        deleteMutation.isPending
    );
    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Vai trò</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo vai trò mới</SheetTitle>
                        </SheetHeader>
                        <RoleForm
                            mode="create"
                            onSubmit={handleSubmitRole}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật vai trò */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật vai trò</SheetTitle>
                    </SheetHeader>
                    <RoleForm
                        mode="update"
                        onSubmit={handleSubmitRole}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={roleCols}
                data={roleItem}
                page={page - 1}
                pageSize={pageSize}
                setPage={(newPage) => setPage(newPage + 1)}
                setPageSize={setPageSize}
                totalPages={totalPages}
                totalItems={totalItems}
            />
        </div>
    );
}

export default Role;
