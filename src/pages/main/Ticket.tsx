import TicketItem from "@/components/common/TicketItem";
import TicketForm from "@/components/forms/TicketForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { TicketResponseType } from "@/types/response/ticket";
import { useCreateTicket, useTickets, useUpdateTicket } from "@/utils/hooks/useTicket";
import toast from "react-hot-toast";

function Ticket() {
    const createTicket = useCreateTicket();
    const updateTicket = useUpdateTicket();
    const { data: ticketDatas } = useTickets(1, 10);
    const handleSubmitTable = async (data: Partial<TicketResponseType>) => {
        try {
            // const commonData = {
            //     table_name: data.table_name,
            //     position: data.position,
            //     seats: Number(data.seats),
            //     memo: data.memo,
            // };

            const payload = {
                ingredient_id: Number(data.ingredient_id),
                quantity: Number(data.quantity),
                unit: data.unit ?? "",
                ticket_type: data.ticket_type ?? "",
            };

            if (data.id) {
                // // Cập nhật
                await updateTicket.mutateAsync({
                    ...payload,
                    id: data.id.toString(),
                });
                toast.success("Cập nhật phiếu nguyên liệu thành công");
            } else {
                // Tạo mới
                await createTicket.mutateAsync(payload);
                toast.success("Tạo phiếu nguyên liệu thành công");
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi xử lý phiếu nguyên liệu");
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
                    <TicketForm mode="create" onSubmit={handleSubmitTable} />
                </SheetContent>
            </Sheet>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {ticketDatas?.data.map((record: TicketResponseType) => (
                    <TicketItem key={record.id} record={record} onSubmit={handleSubmitTable} />
                ))}
            </div>
        </div>
    );
}

export default Ticket;
