import { TicketResponseType } from "@/types/response/ticket";
import { FileDown, FileUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import TicketForm from "@/components/forms/TicketForm";

interface TicketItemProps {
    record: TicketResponseType;
    onSubmit: (data: Partial<TicketResponseType>) => Promise<void>;
}
function TicketItem({ record, onSubmit }: TicketItemProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="cursor-pointer rounded-[10px] border border-gray-300 p-4 shadow-md transition-colors hover:bg-gray-50">
                    {record.ticket_type === "Import" ? (
                        <div className="mb-2 flex items-center gap-2">
                            <FileDown strokeWidth={1.5} className="text-green-700" />
                            <p className="font-medium text-green-700">Nhập kho</p>
                        </div>
                    ) : (
                        <div className="mb-2 flex items-center gap-2">
                            <FileUp strokeWidth={1.5} className="text-red-700" />
                            <p className="font-medium text-red-700">Xuất kho</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <p className="text-[14px] text-gray-700">
                            Nguyên vật liệu:{" "}
                            <span className="font-medium">{record?.ingredient.name}</span>
                        </p>
                        <p className="text-[14px] text-gray-700">
                            Số lượng: <span className="font-medium">{record?.quantity}</span>
                        </p>
                        <p className="text-[14px] text-gray-700">
                            Đơn vị: <span className="font-medium">{record?.unit}</span>
                        </p>
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Cập nhật phiếu nguyên liệu</SheetTitle>
                </SheetHeader>
                <TicketForm mode="update" initialData={record} onSubmit={onSubmit} />
            </SheetContent>
        </Sheet>
    );
}

export default TicketItem;
