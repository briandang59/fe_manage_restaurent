// File: utils/constants/cols/applyRecruitmentCols.tsx
import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { Edit, Trash2 } from "lucide-react";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import dayjs from "dayjs";
import { ApplyRecruitmentResponseType } from "@/types/response/applyRecruitment"; // Giả sử type này tồn tại dựa trên API
import { normalizeCvUrl } from "@/utils/functions/normalizeCvUrl";

export const createApplyRecruitmentColumns =
    () // onEdit?: (item: ApplyRecruitmentResponseType) => void,
    // onDelete?: (id: string) => void,
    // isDeleting?: boolean
    : ColumnDef<ApplyRecruitmentResponseType>[] => [
        {
            accessorKey: "index",
            header: "STT",
            cell: ({ row }) => {
                return <div className="text-center">{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "fullname",
            header: "Họ tên",
            cell: ({ row }) => {
                const fullname = row.original.fullname;
                return <p>{fullname}</p>;
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => {
                const email = row.original.email;
                return <p>{email}</p>;
            },
        },
        {
            accessorKey: "phone_number",
            header: "Số điện thoại",
            cell: ({ row }) => {
                const phone = row.original.phone_number;
                return <p>{phone}</p>;
            },
        },
        {
            accessorKey: "recruitment_title",
            header: "Tin tuyển dụng",
            cell: ({ row }) => {
                const recruitment = row.original.recruitment;
                return <p>{recruitment?.title || "N/A"}</p>;
            },
        },
        {
            accessorKey: "cv_name",
            header: "CV",
            cell: ({ row }) => {
                const cv = row.original.cv;
                if (!cv || !cv.url) {
                    return <p>N/A</p>;
                }

                let normalizedUrl: string;
                try {
                    normalizedUrl = normalizeCvUrl(cv);
                } catch (error) {
                    console.error("Failed to normalize CV URL:", error);
                    normalizedUrl = cv.url;
                }

                return (
                    <a
                        href={normalizedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={cv.file_name}
                        className="text-blue-600 hover:underline"
                    >
                        {cv.file_name}
                    </a>
                );
            },
        },
        {
            accessorKey: "created_at",
            header: "Ngày nộp",
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
        // {
        //     id: "actions",
        //     header: "Thao tác",
        //     cell: ({ row }) => {
        //         const item = row.original;

        //         return (
        //             <div className="flex gap-2">
        //                 <Button variant="outline" size="sm" onClick={() => onEdit?.(item)}>
        //                     <Edit className="h-4 w-4" />
        //                 </Button>

        //                 <AlertDialog>
        //                     <AlertDialogTrigger asChild>
        //                         <Button variant="outline" size="sm" disabled={isDeleting || false}>
        //                             <Trash2 className="h-4 w-4" />
        //                         </Button>
        //                     </AlertDialogTrigger>
        //                     <AlertDialogContent>
        //                         <AlertDialogHeader>
        //                             <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
        //                             <AlertDialogDescription>
        //                                 Bạn có chắc chắn muốn xóa đơn ứng tuyển này? Hành động này không
        //                                 thể hoàn tác.
        //                             </AlertDialogDescription>
        //                         </AlertDialogHeader>
        //                         <AlertDialogFooter>
        //                             <AlertDialogCancel>Hủy</AlertDialogCancel>
        //                             <AlertDialogAction
        //                                 onClick={() => onDelete?.(item.id.toString())}
        //                                 className="bg-red-600 hover:bg-red-700"
        //                             >
        //                                 Xóa
        //                             </AlertDialogAction>
        //                         </AlertDialogFooter>
        //                     </AlertDialogContent>
        //                 </AlertDialog>
        //             </div>
        //         );
        //     },
        // },
    ];
