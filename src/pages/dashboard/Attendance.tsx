import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import AttendanceForm from "@/components/forms/AttendanceForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createAttendanceColumns } from "@/utils/constants/cols/attendanceCols";
import {
    useAttendances,
    useCreateAttendance,
    useUpdateAttendance,
    useDeleteAttendance,
} from "@/utils/hooks/useAttendance";
import { useState } from "react";
import { AttendanceResponse } from "@/types/response/attendance";
import { toast } from "sonner";

function Attendance() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<AttendanceResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: attendanceData, isLoading, error } = useAttendances(page, pageSize);
    const createMutation = useCreateAttendance();
    const updateMutation = useUpdateAttendance();
    const deleteMutation = useDeleteAttendance();
    const attendanceItem = attendanceData?.data || [];
    const paginationData = attendanceData?.pagination;
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

    const handleSubmitAttendance = async (data: Partial<AttendanceResponse>) => {
        if (!data.employee_id || !data.date || !data.status) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                employee_id: data.employee_id,
                date: data.date,
                status: data.status,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật chấm công thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo chấm công thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý chấm công");
        }
    };

    const handleDeleteAttendance = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa chấm công thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa chấm công");
        }
    };

    const attendanceCols = createAttendanceColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteAttendance,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý chấm công</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo chấm công mới</SheetTitle>
                        </SheetHeader>
                        <AttendanceForm
                            mode="create"
                            onSubmit={handleSubmitAttendance}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật chấm công */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật chấm công</SheetTitle>
                    </SheetHeader>
                    <AttendanceForm
                        mode="update"
                        onSubmit={handleSubmitAttendance}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={attendanceCols}
                data={attendanceItem}
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

export default Attendance;
