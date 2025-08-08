import { Button } from "@/components/ui/button";
import { File, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import {
    useMenuItems,
    useDeleteMenuItem,
    useCreateMenuItem,
    useUpdateMenuItem,
} from "@/utils/hooks/useMenuItem";
import { useState } from "react";
import { createMenuColumns } from "@/utils/constants/cols";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuItemForm } from "@/components/forms/MenuItemForm";
import { MenuItemResponse } from "@/types/response/menuItem";
import toast from "react-hot-toast";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";

function ManageMenu() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItemResponse | null>(null);

    const { data: menuData, isLoading, error } = useMenuItems(page, pageSize);
    const deleteMutation = useDeleteMenuItem();
    const createMenuItemMutation = useCreateMenuItem();
    const updateMenuItemMutation = useUpdateMenuItem();
    const paginationData = menuData?.pagination;
    const totalPages = paginationData
        ? Math.ceil(paginationData.total / paginationData.page_size)
        : 1;
    const totalItems = paginationData?.total || 0;
    const menuItems = menuData?.data || [];

    const handleSubmitMenuItem = async (data: Partial<MenuItemResponse>) => {
        try {
            const commonData = {
                name: data.name || "",
                price: Number(data.price) || 0,
                description: data.description || "",
                file_id: Number(data.file_id) || 0,
            };

            if (data.id) {
                // Cập nhật
                const updateData = {
                    ...commonData,
                    id: data.id.toString(),
                    status: data.status || "Available",
                };
                await updateMenuItemMutation.mutateAsync(updateData);
                toast.success("Cập nhật món ăn thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMenuItemMutation.mutateAsync(commonData);
                toast.success("Tạo món ăn thành công");
                setIsCreateDialogOpen(false);
            }
        } catch (error: any) {
            toast.error(`${error.message}` || "Có lỗi xảy ra khi xử lý món ăn");
        }
    };

    const handleEditClick = (item: MenuItemResponse) => {
        setSelectedItem(item);
        setIsUpdateDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa món ăn thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa món ăn");
        }
    };

    const menuColumns = createMenuColumns(handleEditClick, handleDelete, deleteMutation.isPending);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Thực đơn</h1>
                <div className="flex gap-2">
                    <Sheet open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <SheetTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                <span>Thêm mới</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[425px]">
                            <SheetHeader>
                                <SheetTitle>Thêm món ăn mới</SheetTitle>
                            </SheetHeader>
                            <MenuItemForm
                                onSubmit={handleSubmitMenuItem}
                                mode="create"
                                isLoading={false}
                            />
                        </SheetContent>
                    </Sheet>

                    <Button variant="outline">
                        <File className="mr-2 h-4 w-4" />
                        <span>Nhập từ Excel</span>
                    </Button>
                </div>
            </div>

            <DataTable
                columns={menuColumns}
                data={menuItems}
                page={page - 1}
                pageSize={pageSize}
                setPage={(newPage) => setPage(newPage + 1)}
                setPageSize={setPageSize}
                totalPages={totalPages}
                totalItems={totalItems}
            />

            {/* Update Sheet */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent className="sm:max-w-[425px]">
                    <SheetHeader>
                        <SheetTitle>Cập nhật món ăn</SheetTitle>
                    </SheetHeader>
                    {selectedItem && (
                        <MenuItemForm
                            onSubmit={handleSubmitMenuItem}
                            initialData={selectedItem}
                            mode="update"
                            isLoading={false}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default ManageMenu;
