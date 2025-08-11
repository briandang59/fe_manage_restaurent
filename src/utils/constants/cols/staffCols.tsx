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
import { StaffResponse } from "@/types/response/staff";
import dayjs from "dayjs";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";
import { AccountResponse } from "@/types/response/account";

export const createStaffColumns = (
    onEdit: (item: StaffResponse) => void,
    onDelete: (id: string) => void,
    isDeleting: boolean
): ColumnDef<StaffResponse>[] => [
    {
        accessorKey: "index",
        header: "STT",
        cell: ({ row }) => {
            return <div className="text-center">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "full_name",
        header: "Tên nhân viên",
    },
    {
        accessorKey: "gender",
        header: "Giới tính",
        cell: ({ row }) => {
            const gender = row.getValue("gender") as boolean;
            return gender ? "Nam" : "Nữ";
        },
    },
    {
        accessorKey: "birthday",
        header: "Ngày sinh",
        cell: ({ row }) => {
            const birthday = row.getValue("birthday") as string;
            return <p>{dayjs(birthday).format("YYYY/MM/DD")}</p>;
        },
    },
    {
        accessorKey: "phone_number",
        header: "Số điện thoại",
        cell: ({ row }) => {
            const phone_number = row.getValue("phone_number") as string;
            return <span className="rounded-full px-2 py-1 text-[14px]">{phone_number}</span>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "schedule_type",
        header: "Loại lịch làm việc",
        cell: ({ row }) => {
            const schedule_type = row.getValue("schedule_type") as string;
            return <span className="rounded-full px-2 py-1 text-[14px]">{schedule_type}</span>;
        },
    },
    {
        accessorKey: "address",
        header: "Địa chỉ",
        cell: ({ row }) => {
            const address = row.getValue("address") as string;
            return <span className="rounded-full px-2 py-1 text-[14px]">{address}</span>;
        },
    },
    {
        accessorKey: "join_date",
        header: "Ngày tham gia",
        cell: ({ row }) => {
            const join_date = row.getValue("join_date") as string;
            return (
                <span className="rounded-full px-2 py-1 text-[14px]">
                    {dayjs(join_date).format("YYYY/MM/DD")}
                </span>
            );
        },
    },
    {
        accessorKey: "base_salary",
        header: "Lương cơ bản",
        cell: ({ row }) => {
            const base_salary = row.getValue("base_salary") as number;
            return (
                <span className="rounded-full px-2 py-1 text-[14px]">
                    {formatNumberWithCommas(base_salary)}
                </span>
            );
        },
    },
    {
        accessorKey: "salary_per_hour",
        header: "Lương theo giờ",
        cell: ({ row }) => {
            const salary_per_hour = row.getValue("salary_per_hour") as number;
            return (
                <span className="rounded-full px-2 py-1 text-[14px]">
                    {formatNumberWithCommas(salary_per_hour)}
                </span>
            );
        },
    },
    {
        accessorKey: "account",
        header: "Tài khoản",
        cell: ({ row }) => {
            const account = row.getValue("account") as AccountResponse;
            return <span className="rounded-full px-2 py-1 text-[14px]">{account.user_name}</span>;
        },
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
            const staff = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(staff)}>
                        <Edit className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" disabled={isDeleting}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Bạn có chắc chắn muốn xóa nhân viên "{staff.full_name}"? Hành
                                    động này không thể hoàn tác.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete(staff.id.toString())}
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
