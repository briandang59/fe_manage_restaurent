import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import ShiftForm from "@/components/forms/ShiftForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createShiftColumns } from "@/utils/constants/cols/shiftCols";
import { useShifts, useCreateShift, useUpdateShift, useDeleteShift } from "@/utils/hooks/useShift";
import { useState } from "react";
import { ShiftResponse } from "@/types/response/shift";
import { toast } from "sonner";

function Shift() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<ShiftResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: shiftData, isLoading, error } = useShifts(page, pageSize);
    const createMutation = useCreateShift();
    const updateMutation = useUpdateShift();
    const deleteMutation = useDeleteShift();
    const shiftItem = shiftData?.data || [];
    const paginationData = shiftData?.pagination;
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

    const handleSubmitShift = async (data: Partial<ShiftResponse>) => {
        if (!data.shift_name || !data.start_time || !data.end_time) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                shift_name: data.shift_name,
                start_time: data.start_time,
                end_time: data.end_time,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật ca làm việc thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo ca làm việc thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý ca làm việc");
        }
    };

    const handleDeleteShift = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa ca làm việc thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa ca làm việc");
        }
    };

    const shiftCols = createShiftColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteShift,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý ca làm việc</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo ca làm việc mới</SheetTitle>
                        </SheetHeader>
                        <ShiftForm
                            mode="create"
                            onSubmit={handleSubmitShift}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật ca làm việc */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật ca làm việc</SheetTitle>
                    </SheetHeader>
                    <ShiftForm
                        mode="update"
                        onSubmit={handleSubmitShift}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={shiftCols}
                data={shiftItem}
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

export default Shift;
