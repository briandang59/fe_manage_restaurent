import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createRoleColumns } from "@/utils/constants/cols/roleCols";
import { useRoles } from "@/utils/hooks/useRole";
import { useState } from "react";

function Role() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data: roleData, isLoading, error } = useRoles(page, pageSize);
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
    // const handleSubmitStaff = async (
    //     data: Partial<RoleResponse> & { role_id?: string | number }
    // ) => {
    //     try {
    //         const commonData = {
    //             perm,
    //         };

    //         if (data.id) {
    //             // Cập nhật
    //             const updateData = {
    //                 ...commonData,
    //                 id: data.id.toString(),
    //             };
    //             await updateMutation.mutateAsync(updateData);
    //             toast.success("Cập nhật nhân viên thành công");
    //             setIsUpdateDialogOpen(false);
    //             setSelectedItem(null);
    //         } else {
    //             // Tạo mới
    //             await createMutation.mutateAsync(commonData);
    //             toast.success("Tạo nhân viên thành công");
    //             setIsCreateDialogOpen(false);
    //         }
    //     } catch (error: any) {
    //         toast.error(`${error.message}` || "Có lỗi xảy ra khi xử lý nhân viên");
    //     }
    // };
    const roleCols = createRoleColumns();
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
                        {/* <RoleForm mode="create" onSubmit={} /> */}
                    </SheetContent>
                </Sheet>
            </div>
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
