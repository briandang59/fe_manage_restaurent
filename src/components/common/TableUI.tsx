import { TableResponse } from "@/types/response/table";
import { UtensilsCrossed } from "lucide-react";

interface TableUIProps {
    record: TableResponse;
}
function TableUI({ record }: TableUIProps) {
    return (
        <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-2 rounded-md border border-gray-300 bg-blue-200">
            <UtensilsCrossed className="text-2xl" />
            <p className="text-sm font-medium">{record?.table_name}</p>
        </div>
    );
}

export default TableUI;
