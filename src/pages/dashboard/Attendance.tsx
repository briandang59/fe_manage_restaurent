import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";

import { DataTable } from "@/components/ui/data-table";
import { createAttendanceColumns } from "@/utils/constants/cols/attendanceCols";
import { useAttendances, useDeleteAttendance } from "@/utils/hooks/useAttendance";
import { useState } from "react";
import { AttendanceResponse } from "@/types/response/attendance";
import { toast } from "sonner";

function Attendance() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [, setSelectedItem] = useState<AttendanceResponse | null>(null);
    const [, setIsUpdateDialogOpen] = useState(false);
    const { data: attendanceData, isLoading, error } = useAttendances(page, pageSize);
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
            </div>

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
