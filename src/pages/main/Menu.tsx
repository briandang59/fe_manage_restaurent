import TableUI from "@/components/common/TableUI";
import { useTables } from "@/utils/hooks/useTable";

function MenuPublic() {
    const { data: tables } = useTables(1, 10);
    return (
        <div className="flex flex-col gap-4">
            {tables?.data?.map((table) => (
                <TableUI key={table.id} record={table} />
            ))}
        </div>
    );
}

export default MenuPublic;
