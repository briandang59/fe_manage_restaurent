import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import TableForm from "@/components/forms/TableForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createTableColumns } from "@/utils/constants/cols/tableCols";
import { useTables, useCreateTable, useUpdateTable, useDeleteTable } from "@/utils/hooks/useTable";
import { useState } from "react";
import { TableResponse } from "@/types/response/table";
import { toast } from "sonner";

function Table() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<TableResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: tableData, isLoading, error } = useTables(page, pageSize);
    const createMutation = useCreateTable();
    const updateMutation = useUpdateTable();
    const deleteMutation = useDeleteTable();
    const tableItem = tableData?.data || [];
    const paginationData = tableData?.pagination;
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

    const handleSubmitTable = async (data: Partial<TableResponse>) => {
        if (!data.name) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                name: data.name,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật bàn thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo bàn thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý bàn");
        }
    };

    const handleDeleteTable = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa bàn thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa bàn");
        }
    };

    const tableCols = createTableColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteTable,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý bàn</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo bàn mới</SheetTitle>
                        </SheetHeader>
                        <TableForm
                            mode="create"
                            onSubmit={handleSubmitTable}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật bàn */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật bàn</SheetTitle>
                    </SheetHeader>
                    <TableForm
                        mode="update"
                        onSubmit={handleSubmitTable}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={tableCols}
                data={tableItem}
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

export default Table;
