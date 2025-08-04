import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { createRoleColumns } from "@/utils/constants/cols/roleCols";
import { useRoles } from "@/utils/hooks/useRole";
import { useState } from "react";

function Role() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data: roleData, isLoading, error } = useRoles(page, pageSize);
    const roleItem = roleData?.data || [];
    const paginationData = roleData?.pagination;
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
    const roleCols = createRoleColumns();
    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Vai trò</h1>
                <Button>Thêm mới</Button>
            </div>
            <DataTable
                columns={roleCols}
                data={roleItem}
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

export default Role;
