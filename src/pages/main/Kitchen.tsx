import OrderByTable from "@/components/common/OrderByTable";

function Kitchen() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-4">
                <OrderByTable />
                <OrderByTable />
                <OrderByTable />
            </div>
        </div>
    );
}

export default Kitchen;
