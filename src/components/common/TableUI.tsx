import { TableResponse } from "@/types/response/table";
import { UtensilsCrossed } from "lucide-react";

interface TableUIProps {
    record: TableResponse;
    onClick?: () => void;
}
function TableUI({ record, onClick }: TableUIProps) {
    return (
        <button
            className="flex h-[100px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-gray-300 bg-gray-200 duration-300 hover:bg-gray-100"
            onClick={onClick}
        >
            <UtensilsCrossed className="text-2xl" />
            <p className="text-sm font-medium">{record?.table_name}</p>
        </button>
    );
}

export default TableUI;
