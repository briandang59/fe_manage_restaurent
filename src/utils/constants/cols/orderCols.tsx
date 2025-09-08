import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CreditCard } from "lucide-react";
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
import { OrderResponse } from "@/types/response/order";
import dayjs from "dayjs";

export const createOrderColumns = (
    onEdit?: (item: OrderResponse) => void,
    onDelete?: (id: string) => void,
    onPayment?: (item: OrderResponse) => void,
    isDeleting?: boolean
): ColumnDef<OrderResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "employee_id",
        header: "ID Nhân viên",
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
                        status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : status === "completed"
                              ? "bg-green-100 text-green-800"
                              : status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                    }`}
                >
                    {status === "pending"
                        ? "Chờ xử lý"
                        : status === "completed"
                          ? "Hoàn thành"
                          : status === "cancelled"
                            ? "Đã hủy"
                            : "Không xác định"}
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
            const orderItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit?.(orderItem)}>
                        <Edit className="h-4 w-4" />
                    </Button>

                    {orderItem.status === "pending" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPayment?.(orderItem)}
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                        >
                            <CreditCard className="h-4 w-4" />
                        </Button>
                    )}

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
                                    Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể
                                    hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(orderItem.id.toString())}
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
