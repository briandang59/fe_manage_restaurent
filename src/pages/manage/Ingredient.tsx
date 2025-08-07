import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import IngredientForm from "@/components/forms/IngredientForm";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createIngredientColumns } from "@/utils/constants/cols/ingredientCols";
import {
    useIngredients,
    useCreateIngredient,
    useUpdateIngredient,
    useDeleteIngredient,
} from "@/utils/hooks/useIngredient";
import { useState } from "react";
import { IngredientResponse } from "@/types/response/ingredients";
import { toast } from "sonner";

function Ingredient() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedItem, setSelectedItem] = useState<IngredientResponse | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const { data: ingredientData, isLoading, error } = useIngredients(page, pageSize);
    const createMutation = useCreateIngredient();
    const updateMutation = useUpdateIngredient();
    const deleteMutation = useDeleteIngredient();
    const ingredientItem = ingredientData?.data || [];
    const paginationData = ingredientData?.pagination;
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

    const handleSubmitIngredient = async (data: Partial<IngredientResponse>) => {
        if (!data.name || data.quantity === undefined) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            const commonData = {
                name: data.name,
                quantity: data.quantity,
            };

            if (data.id) {
                // Cập nhật
                await updateMutation.mutateAsync({
                    ...commonData,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật nguyên liệu thành công");
                setIsUpdateDialogOpen(false);
                setSelectedItem(null);
            } else {
                // Tạo mới
                await createMutation.mutateAsync(commonData);
                toast.success("Tạo nguyên liệu thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý nguyên liệu");
        }
    };

    const handleDeleteIngredient = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Xóa nguyên liệu thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xóa nguyên liệu");
        }
    };

    const ingredientCols = createIngredientColumns(
        (item) => {
            setSelectedItem(item);
            setIsUpdateDialogOpen(true);
        },
        handleDeleteIngredient,
        deleteMutation.isPending
    );

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <h1 className="text-[20px] font-bold">Quản lý nguyên liệu</h1>
                <Sheet>
                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tạo nguyên liệu mới</SheetTitle>
                        </SheetHeader>
                        <IngredientForm
                            mode="create"
                            onSubmit={handleSubmitIngredient}
                            isLoading={createMutation.isPending}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Dialog cập nhật nguyên liệu */}
            <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cập nhật nguyên liệu</SheetTitle>
                    </SheetHeader>
                    <IngredientForm
                        mode="update"
                        onSubmit={handleSubmitIngredient}
                        initialData={selectedItem || undefined}
                        isLoading={updateMutation.isPending}
                    />
                </SheetContent>
            </Sheet>

            <DataTable
                columns={ingredientCols}
                data={ingredientItem}
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

export default Ingredient;
