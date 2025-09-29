import orderItemApis from "@/apis/orderItemApis";
import OrderCard from "@/components/common/OrderByTable";
import { useOrderItems } from "@/utils/hooks/useOrderItem";

function Kitchen() {
    const { data: orders, refetch } = useOrderItems(1, 10);

    const handleUpdateStatus = async (id: number, status: string) => {
        await orderItemApis.updateOrderItem(id.toString(), { status });
        refetch();
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">👨‍🍳 Kitchen Display</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {orders?.data.map((item) => (
                    <OrderCard
                        key={item.id}
                        orderItem={item}
                        onUpdateStatus={(status) => handleUpdateStatus(item.id, status)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Kitchen;
