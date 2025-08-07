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
import { ShiftResponse } from "@/types/response/shift";
import dayjs from "dayjs";

type ShiftColumnParams = {
    onEdit?: (item: ShiftResponse) => void;
    onDelete?: (id: string) => void;
    isDeleting?: boolean;
};

export const createShiftColumns = (
    onEdit?: (item: ShiftResponse) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<ShiftResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "shift_name",
        header: "Tên ca làm việc",
    },
    {
        accessorKey: "start_time",
        header: "Thời gian bắt đầu",
        cell: ({ row }) => {
            const start_time = row.getValue("start_time") as string;
            return <p>{dayjs(start_time).format("HH:mm")}</p>;
        },
    },
    {
        accessorKey: "end_time",
        header: "Thời gian kết thúc",
        cell: ({ row }) => {
            const end_time = row.getValue("end_time") as string;
            return <p>{dayjs(end_time).format("HH:mm")}</p>;
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
            const shiftItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit?.(shiftItem)}>
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
                                    Bạn có chắc chắn muốn xóa ca làm việc "{shiftItem.shift_name}"?
                                    Hành động này không thể hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(shiftItem.id.toString())}
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
