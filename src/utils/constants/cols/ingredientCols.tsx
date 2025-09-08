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
import { IngredientResponse } from "@/types/response/ingredients";
import dayjs from "dayjs";

export const createIngredientColumns = (
    onEdit?: (item: IngredientResponse) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<IngredientResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div>{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Tên nguyên liệu",
    },
    {
        accessorKey: "description",
        header: "Mô tả",
    },
    {
        accessorKey: "quantity",
        header: "Số lượng",
        cell: ({ row }) => {
            const quantity = row.getValue("quantity") as number;
            return <p>{quantity}</p>;
        },
    },
    {
        accessorKey: "warning_quantity",
        header: "Số lượng giới hạn",
        cell: ({ row }) => {
            const quantity = row.getValue("warning_quantity") as number;
            return <p>{quantity}</p>;
        },
    },
    {
        accessorKey: "unit",
        header: "Đơn vị",
    },
    {
        accessorKey: "supplier",
        header: "Nhà cung cấp",
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
            const ingredientItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit?.(ingredientItem)}>
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
                                    Bạn có chắc chắn muốn xóa nguyên liệu "{ingredientItem.name}"?
                                    Hành động này không thể hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(ingredientItem.id.toString())}
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
