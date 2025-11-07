import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/ui/data-table";
import { createApplyRecruitmentColumns } from "@/utils/constants/cols/applyRecruitmentCols";
import { useApplyRecruitments } from "@/utils/hooks/useApplyRecruitment";
import { useState } from "react";

function ApplyRecruitmentDashboard() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Sửa type trong hook nếu cần: ApiResponse<ApplyRecruitmentResponseType>
    const { data, isLoading, error } = useApplyRecruitments(page, pageSize);
    const applyRecruitments = data?.data || [];
    const pagination = data?.pagination;

    const cols = createApplyRecruitmentColumns();

    if (isLoading) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Quản lý đơn ứng tuyển</h1>
            </div>

            <DataTable
                columns={cols}
                data={applyRecruitments}
                page={page - 1}
                pageSize={pageSize}
                setPage={(p) => setPage(p + 1)}
                setPageSize={setPageSize}
                totalPages={Math.ceil((pagination?.total ?? 0) / (pagination?.page_size ?? 1))}
            />
        </div>
    );
}

export default ApplyRecruitmentDashboard;
