import TicketForm from "@/components/forms/TicketForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TicketResponseType } from "@/types/response/ticket";
import toast from "react-hot-toast";

function Ticket() {
    const handleSubmitTable = async (data: Partial<TicketResponseType>) => {
        try {
            // const commonData = {
            //     table_name: data.table_name,
            //     position: data.position,
            //     seats: Number(data.seats),
            //     memo: data.memo,
            // };

            if (data.id) {
                // // Cập nhật
                // await updateMutation.mutateAsync({
                //     ...commonData,
                //     id: data.id.toString(),
                // });
                // toast.success("Cập nhật bàn thành công");
                // setIsUpdateDialogOpen(false);
                // setSelectedItem(null);
            } else {
                // Tạo mới
                // await createMutation.mutateAsync(commonData);
                toast.success("Tạo bàn thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý bàn");
        }
    };

    return (
        <div className="container mx-auto">
            <Sheet>
                <div className="flex items-center justify-between">
                    <h2 className="text-[20px] font-bold">Nhập - Xuất nguyên vật liệu</h2>

                    <SheetTrigger>
                        <Button>Thêm mới</Button>
                    </SheetTrigger>
                </div>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Nhập kho - Xuất kho</SheetTitle>
                    </SheetHeader>
                    <TicketForm
                        mode="create"
                        onSubmit={handleSubmitTable}
                        // isLoading={createMutation.isPending}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Ticket;
