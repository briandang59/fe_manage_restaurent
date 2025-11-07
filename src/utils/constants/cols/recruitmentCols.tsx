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
import dayjs from "dayjs";
import { RecruitmentResponseType } from "@/types/response/recruitment";

export const createRecruitmentColumns = (
    onEdit?: (item: RecruitmentResponseType) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<RecruitmentResponseType>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) => {
            const title = row.original.title;
            return <p>{title}</p>;
        },
    },
    {
        accessorKey: "content",
        header: "Nội dung",
        cell: ({ row }) => {
            const content = row.original.content;

            return (
                <div
                    className="prose prose-sm line-clamp-3 max-w-full"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const isOpen = row.original.is_open;

            return (
                <span
                    className={`text-nowrap rounded-full px-2 py-1 text-xs font-medium ${
                        isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                >
                    {isOpen ? "Đang mở" : "Đã đóng"}
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
