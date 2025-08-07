import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createPermissionColumns } from "@/utils/constants/cols/permissionCols";
import {
    usePermissions,
    useCreatePermission,
    useUpdatePermission,
    useDeletePermission,
} from "@/utils/hooks/usePermission";
import { useState } from "react";
import { PermissionResponse } from "@/types/response/permission";
import { toast } from "sonner";
import PermissionForm from "@/components/forms/PermissionForm";

function Permission() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<PermissionResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: permissionData, isLoading, error } = usePermissions(page, pageSize);
    const createMutation = useCreatePermission();
    const updateMutation = useUpdatePermission();
    const deleteMutation = useDeletePermission();
    const permissionItem = permissionData?.data || [];
    const paginationData = permissionData?.pagination;
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

    const handleSubmitPermission = async (data: Partial<PermissionResponse>) => {
        if (!data.permission_name) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                permission_name: data.permission_name,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật quyền thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo quyền thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý quyền");
        }
    };

    const handleDeletePermission = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa quyền thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa quyền");
        }
    };

    const permissionCols = createPermissionColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeletePermission,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quyền hạn</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo quyền mới</SheetTitle>
                        </SheetHeader>
                        <PermissionForm
                            mode="create"
                            onSubmit={handleSubmitPermission}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật quyền */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật quyền</SheetTitle>
                    </SheetHeader>
                    <PermissionForm
                        mode="update"
                        onSubmit={handleSubmitPermission}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={permissionCols}
                data={permissionItem}
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

export default Permission;
