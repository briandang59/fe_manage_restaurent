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
import { RoleResponse } from "@/types/response/roles";
import dayjs from "dayjs";
import { PermissionResponse } from "@/types/response/permission";

export const createRoleColumns = (
    onEdit?: (item: RoleResponse) => void,
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): ColumnDef<RoleResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "role_name",
        header: "Tên vai trò",
    },
    {
        accessorKey: "permissions",
        header: "Quyền hạn",
        cell: ({ row }) => {
            const permissions = row.getValue("permissions") as PermissionResponse[];
            return (
                <div className="flex max-w-[300px] flex-wrap items-center gap-2">
                    {permissions.map((permission) => (
                        <p
                            key={permission.id}
                            className="w-fit rounded-full bg-[#5D4037] p-1 text-sm text-white"
                        >
                            {permission.permission_name}
                        </p>
                    ))}
                </div>
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
            const menuItem = row.original;

            return (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit?.(menuItem)}
                        disabled={!onEdit}
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
                                    Bạn có chắc chắn muốn xóa vai trò "{menuItem.role_name}"? Hành
                                    động này không thể hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete?.(menuItem.id.toString())}
                                    className="bg-red-600 hover:bg-red-700"
                                    disabled={!onDelete}
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
