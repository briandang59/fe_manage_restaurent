import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import OrderForm from "@/components/forms/OrderForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createOrderColumns } from "@/utils/constants/cols/orderCols";
import { useOrders, useCreateOrder, useUpdateOrder, useDeleteOrder } from "@/utils/hooks/useOrder";
import { useState } from "react";
import { OrderResponse } from "@/types/response/order";
import { toast } from "sonner";

function Orders() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<OrderResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: orderData, isLoading, error } = useOrders(page, pageSize);
    const createMutation = useCreateOrder();
    const updateMutation = useUpdateOrder();
    const deleteMutation = useDeleteOrder();
    const orderItem = orderData?.data || [];
    const paginationData = orderData?.pagination;
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

    const handleSubmitOrder = async (data: Partial<OrderResponse>) => {
        if (!data.employee_id || !data.date || !data.status) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
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
                toast.success("Cập nhật đơn hàng thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo đơn hàng thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý đơn hàng");
        }
    };

    const handleDeleteOrder = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa đơn hàng thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa đơn hàng");
        }
    };

    const orderCols = createOrderColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteOrder,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý đơn hàng</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo đơn hàng mới</SheetTitle>
                        </SheetHeader>
                        <OrderForm
                            mode="create"
                            onSubmit={handleSubmitOrder}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật đơn hàng */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật đơn hàng</SheetTitle>
                    </SheetHeader>
                    <OrderForm
                        mode="update"
                        onSubmit={handleSubmitOrder}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={orderCols}
                data={orderItem}
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

export default Orders;
