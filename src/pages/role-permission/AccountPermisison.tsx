import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import AccountForm from "@/components/forms/AccountForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createAccountColumns } from "@/utils/constants/cols/accountCols";
import {
    useAccounts,
    useCreateAccount,
    useUpdateAccount,
    useDeleteAccount,
} from "@/utils/hooks/useAccount";
import { useState } from "react";
import { AccountResponse } from "@/types/response/account";
import { toast } from "sonner";

function AccountPermission() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<AccountResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: accountData, isLoading, error } = useAccounts(page, pageSize);
    const createMutation = useCreateAccount();
    const updateMutation = useUpdateAccount();
    const deleteMutation = useDeleteAccount();
    const accountItem = accountData?.data || [];
    const paginationData = accountData?.pagination;
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

    const handleSubmitAccount = async (data: Partial<AccountResponse>) => {
        if (!data.user_name || !data.role_id) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                user_name: data.user_name,
                role_id: data.role_id,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật tài khoản thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo tài khoản thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý tài khoản");
        }
    };

    const handleDeleteAccount = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa tài khoản thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa tài khoản");
        }
    };

    const accountCols = createAccountColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteAccount,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý tài khoản</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo tài khoản mới</SheetTitle>
                        </SheetHeader>
                        <AccountForm
                            mode="create"
                            onSubmit={handleSubmitAccount}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật tài khoản */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật tài khoản</SheetTitle>
                    </SheetHeader>
                    <AccountForm
                        mode="update"
                        onSubmit={handleSubmitAccount}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={accountCols}
                data={accountItem}
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

export default AccountPermission;
