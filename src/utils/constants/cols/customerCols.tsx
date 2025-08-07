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
import { CustomerResponse } from "@/types/response/customer";
import dayjs from "dayjs";

type CustomerColumnParams = {
    onEdit?: (item: CustomerResponse) => void;
    onDelete?: (id: string) => void;
    isDeleting?: boolean;
};

export const createCustomerColumns = (
    onEdit?: (item: CustomerResponse) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<CustomerResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Tên khách hàng",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
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
            const customerItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit?.(customerItem)}>
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
                                    Bạn có chắc chắn muốn xóa khách hàng "{customerItem.name}"? Hành
                                    động này không thể hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(customerItem.id.toString())}
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
