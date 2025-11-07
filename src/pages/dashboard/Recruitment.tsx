import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/ui/data-table";
import { createRecruitmentColumns } from "@/utils/constants/cols/recruitmentCols";
import {
    useRecruitments,
    useCreateRecruitment,
    useUpdateRecruitment,
    useDeleteRecruitment,
} from "@/utils/hooks/useRecruitment";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { RecruitmentResponseType } from "@/types/response/recruitment";
import RecruitmentForm from "@/components/forms/RecruitmentForm";

interface RecruitmentFormValues {
    title: string;
    content: string;
    is_open: boolean;
}

function RecruitmentDashboard() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [openSheet, setOpenSheet] = useState(false);
    const [editingItem, setEditingItem] = useState<RecruitmentResponseType | null>(null);

    const { data, isLoading, error } = useRecruitments(page, pageSize);
    const recruitments = data?.data || [];
    const pagination = data?.pagination;

    const createMutation = useCreateRecruitment();
    const updateMutation = useUpdateRecruitment();
    const deleteMutation = useDeleteRecruitment();

    const cols = createRecruitmentColumns(
        (item: RecruitmentResponseType) => {
            setEditingItem(item);
            setOpenSheet(true);
        },
        (id: string) => deleteMutation.mutate(id),
        deleteMutation.isPending
    );

    const handleSubmit = (form: RecruitmentFormValues) => {
        if (editingItem) {
            updateMutation.mutate(
                { id: String(editingItem.id), ...form },
                {
                    onSuccess: () => {
                        setOpenSheet(false);
                        setEditingItem(null);
                    },
                }
            );
        } else {
            createMutation.mutate(form, {
                onSuccess: () => {
                    setOpenSheet(false);
                },
            });
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Quản lý tin tuyển dụng</h1>

                <button
                    onClick={() => {
                        setEditingItem(null);
                        setOpenSheet(true);
                    }}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    + Thêm
                </button>
            </div>

            <DataTable
                columns={cols}
                data={recruitments}
                page={page - 1}
                pageSize={pageSize}
                setPage={(p) => setPage(p + 1)}
                setPageSize={setPageSize}
                totalPages={Math.ceil((pagination?.total ?? 0) / (pagination?.page_size ?? 1))}
            />

            {/* FORM */}
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetContent side="right">
                    <RecruitmentForm
                        initialData={editingItem ?? undefined}
                        mode={editingItem ? "update" : "create"}
                        isLoading={createMutation.isPending || updateMutation.isPending}
                        onSubmit={handleSubmit}
                        onClose={() => setOpenSheet(false)}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default RecruitmentDashboard;
