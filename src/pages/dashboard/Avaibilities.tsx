import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/ui/data-table";
import { createAvailibilitiesColumns } from "@/utils/constants/cols/availibilitiesCols";
import { useAvailibilities, useDeleteAvailibilities } from "@/utils/hooks/useAvailibilities";
import { useState } from "react";
import { AvailibilitiesResponse } from "@/types/response/availibilities";
import { toast } from "sonner";

function Avaibilities() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [, setSelectedItem] = useState<AvailibilitiesResponse | null>(null);
    const { data: availibilitiesData, isLoading, error } = useAvailibilities(page, pageSize);
    const deleteMutation = useDeleteAvailibilities();
    const availibilitiesItem = availibilitiesData?.data || [];
    const paginationData = availibilitiesData?.pagination;
    const totalPages = paginationData
        ? Math.ceil(paginationData.total / paginationData.page_size)
        : 1;
    const totalItems = paginationData?.total || 0;

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    const handleDeleteAvailibilities = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa lịch rảnh thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa lịch rảnh");
        }
    };

    const availibilitiesCols = createAvailibilitiesColumns(
        (item) => {
            setSelectedItem(item);
        },
        handleDeleteAvailibilities,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý lịch rảnh</h1>
            </div>

            <DataTable
                columns={availibilitiesCols}
                data={availibilitiesItem.sort((item) => item.id)}
                page={page - 1}
                pageSize={pageSize}
                setPage={(newPage) => setPage(newPage + 1)}
                setPageSize={setPageSize}
                totalPages={totalPages}
                totalItems={totalItems}
            />
        </div>
    );
}

export default Avaibilities;
