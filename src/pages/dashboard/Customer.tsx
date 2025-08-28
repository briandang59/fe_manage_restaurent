import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import CustomerForm from "@/components/forms/CustomerForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createCustomerColumns } from "@/utils/constants/cols/customerCols";
import {
    useCustomers,
    useCreateCustomer,
    useUpdateCustomer,
    useDeleteCustomer,
} from "@/utils/hooks/useCustomer";
import { useState } from "react";
import { CustomerResponse } from "@/types/response/customer";
import { toast } from "sonner";

function Customer() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<CustomerResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: customerData, isLoading, error } = useCustomers(page, pageSize);
    const createMutation = useCreateCustomer();
    const updateMutation = useUpdateCustomer();
    const deleteMutation = useDeleteCustomer();
    const customerItem = customerData?.data || [];
    const paginationData = customerData?.pagination;
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

    const handleSubmitCustomer = async (data: Partial<CustomerResponse>) => {
        if (!data.name || !data.email || !data.phone) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                full_name: data.name,
                phone_number: data.phone,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật khách hàng thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo khách hàng thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý khách hàng");
        }
    };

    const handleDeleteCustomer = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa khách hàng thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa khách hàng");
        }
    };

    const customerCols = createCustomerColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteCustomer,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý khách hàng</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo khách hàng mới</SheetTitle>
                        </SheetHeader>
                        <CustomerForm
                            mode="create"
                            onSubmit={handleSubmitCustomer}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật khách hàng */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật khách hàng</SheetTitle>
                    </SheetHeader>
                    <CustomerForm
                        mode="update"
                        onSubmit={handleSubmitCustomer}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={customerCols}
                data={customerItem}
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

export default Customer;
