import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AttendanceResponse } from "@/types/response/attendance";
import dayjs from "dayjs";

export const createAttendanceColumns = (
    onEdit?: (item: AttendanceResponse) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<AttendanceResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "employee_id",
        header: "Nhân viên",
        cell: ({ row }) => {
            const fullname = row.original.shift_schedule.employee.full_name;
            return <p>{fullname}</p>;
        },
    },
    {
        accessorKey: "actual_start_time",
        header: "Giờ vào ca",
        cell: ({ row }) => {
            const actual_start_time = row.original.actual_start_time;
            return <p>{dayjs(actual_start_time).format("YYYY-MM-DD HH:mm")}</p>;
        },
    },
    {
        accessorKey: "actual_start_time",
        header: "Giờ ra ca",
        cell: ({ row }) => {
            const actual_end_time = row.original.actual_end_time;
            return <p>{dayjs(actual_end_time).format("YYYY-MM-DD HH:mm")}</p>;
        },
    },
    {
        accessorKey: "hours",
        header: "Số giờ làm",
        cell: ({ row }) => {
            const hours = row.original.hours;
            return <p>{hours}</p>;
        },
    },
    {
        accessorKey: "date",
        header: "Ngày",
        cell: ({ row }) => {
            const date = row.getValue("date") as string;
            return <p>{dayjs(date).format("YYYY/MM/DD")}</p>;
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                        status === "present"
                            ? "bg-green-100 text-green-800"
                            : status === "absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {status === "present" ? "Có mặt" : status === "absent" ? "Vắng" : "Muộn"}
                </span>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Ngày tạo",
        cell: ({ row }) => {
            const created_at = row.getValue("created_at") as string;
            return <p>{dayjs(created_at).format("YYYY/MM/DD HH:mm")}</p>;
        },
    },
    {
        accessorKey: "updated_at",
        header: "Ngày cập nhật",
        cell: ({ row }) => {
            const updated_at = row.getValue("updated_at") as string;
            return <p>{dayjs(updated_at).format("YYYY/MM/DD HH:mm")}</p>;
        },
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
            const attendanceItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit?.(attendanceItem)}>
                        <Edit className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" disabled={isDeleting || false}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Bạn có chắc chắn muốn xóa bản ghi chấm công này? Hành động này
                                    không thể hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(attendanceItem.id.toString())}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Xóa
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];
