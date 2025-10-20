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
import { AvailibilitiesResponse } from "@/types/response/availibilities";
import dayjs from "dayjs";

export const createAvailibilitiesColumns = (
    onEdit?: (item: AvailibilitiesResponse) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<AvailibilitiesResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        // 🚨 SỬA LỖI: Cột Tên Nhân viên (Hiển thị Tên thay vì ID)
        accessorKey: "employee.full_name",
        header: "Tên Nhân viên",
        cell: ({ row }) => {
            const fullName = row.original.employee?.full_name;
            // Nếu preload thành công, hiển thị tên. Nếu không, có thể hiển thị ID
            return <p>{fullName ?? "N/A"}</p>;
        },
    },
    {
        // Cột ID Nhân viên (Giữ lại để dễ debug/tra cứu)
        accessorKey: "employee_id",
        header: "ID Nhân viên",
        cell: ({ row }) => {
            return <p>{row.original.employee_id}</p>;
        },
    },
    {
        // 🚨 SỬA LỖI: Cột ID Ca làm việc (Hiển thị Tên Ca làm việc nếu có)
        accessorKey: "shifts.shift_name",
        header: "Tên Ca làm việc",
        cell: ({ row }) => {
            const shiftName = row.original.shifts?.shift_name;
            return <p>{shiftName ?? row.original.shift_id}</p>;
        },
    },
    {
        accessorKey: "day_of_week",
        header: "Thứ trong tuần",
    },
    {
        accessorKey: "date",
        header: "Ngày",
        cell: ({ row }) => {
            const date = row.getValue("date") as string;
            // Giả định date là day_of_week (hoặc bạn có thể dùng day_of_week)
            return <p>{dayjs(date).format("YYYY/MM/DD")}</p>;
        },
    },
    {
        accessorKey: "is_available", // Cập nhật accessorKey để khớp với dữ liệu JSON
        header: "Trạng thái",
        cell: ({ row }) => {
            // Lấy giá trị boolean từ is_available
            const isAvailable = row.original.is_available;
            const statusText = isAvailable ? "Rảnh" : "Bận";
            const bgColor = isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

            return (
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${bgColor}`}>
                    {statusText}
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
            const availibilitiesItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(availibilitiesItem)}
                    >
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
                                    Bạn có chắc chắn muốn xóa lịch rảnh này? Hành động này không thể
                                    hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(availibilitiesItem.id.toString())}
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
