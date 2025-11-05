import { TableResponse } from "@/types/response/table";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils"; // nếu bạn có util merge classNames

interface TableUIProps {
    record: TableResponse;
    onClick?: () => void;
}

function TableUI({ record, onClick }: TableUIProps) {
    return (
        <button
            className={cn(
                "flex h-[120px] w-full transform cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border shadow-sm duration-300 hover:scale-105",
                record?.is_occupied
                    ? "border-[#60be78] bg-[#60be78] hover:bg-[#60be78]"
                    : "border-[#E7CEAD] bg-[#E7CEAD] hover:bg-[#E7CEAD]"
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
