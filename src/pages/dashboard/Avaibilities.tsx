import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import AvailibilitiesForm from "@/components/forms/AvailibilitiesForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createAvailibilitiesColumns } from "@/utils/constants/cols/availibilitiesCols";
import {
    useAvailibilities,
    useCreateAvailibilities,
    useUpdateAvailibilities,
    useDeleteAvailibilities,
} from "@/utils/hooks/useAvailibilities";
import { useState } from "react";
import { AvailibilitiesResponse } from "@/types/response/availibilities";
import { toast } from "sonner";

function Avaibilities() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<AvailibilitiesResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: availibilitiesData, isLoading, error } = useAvailibilities(page, pageSize);
    const createMutation = useCreateAvailibilities();
    const updateMutation = useUpdateAvailibilities();
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

    const handleSubmitAvailibilities = async (data: Partial<AvailibilitiesResponse>) => {
        if (!data.shift_id || !data.employee_id || !data.date || !data.status) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                shift_id: data.shift_id,
                employee_id: data.employee_id,
                date: data.date,
                status: data.status,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật lịch rảnh thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo lịch rảnh thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý lịch rảnh");
        }
    };

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
            setIsUpdateDialogOpen(true);
        },
        handleDeleteAvailibilities,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý lịch rảnh</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo lịch rảnh mới</SheetTitle>
                        </SheetHeader>
                        <AvailibilitiesForm
                            mode="create"
                            onSubmit={handleSubmitAvailibilities}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật lịch rảnh */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật lịch rảnh</SheetTitle>
                    </SheetHeader>
                    <AvailibilitiesForm
                        mode="update"
                        onSubmit={handleSubmitAvailibilities}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={availibilitiesCols}
                data={availibilitiesItem}
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
