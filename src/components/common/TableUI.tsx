import { TableResponse } from "@/types/response/table";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils"; // nếu bạn có util merge classNames

interface TableUIProps {
    record: TableResponse;
    onClick?: () => void;
    status?: "empty" | "using" | "paid";
}

function TableUI({ record, onClick, status = "empty" }: TableUIProps) {
    const statusColors: Record<typeof status, string> = {
        empty: "bg-[#E7CEAD] border-[#E7CEAD] hover:bg-[#E7CEAD]",
        using: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200",
        paid: "bg-gray-100 border-gray-300 hover:bg-gray-200",
    };

    return (
        <button
            className={cn(
                "flex h-[120px] w-full transform cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border shadow-sm duration-300 hover:scale-105",
                statusColors[status]
            )}
            onClick={onClick}
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
                <UtensilsCrossed className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-base font-semibold text-gray-800">{record?.table_name}</p>
        </button>
    );
}

export default TableUI;
