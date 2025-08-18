import { useQuery } from "@tanstack/react-query";
import orderApis from "@/apis/orderApis";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";
import { useOrderItemsByOrderId } from "@/utils/hooks/useOrderItem";
import { BaseResponse } from "@/types/response/baseResponse";
import { OrderResponse } from "@/types/response/order";

function PaymentTab({ tableId }: { tableId?: number }) {
    // 🟢 Lấy order theo tableId
    const { data, isLoading, isError } = useQuery<BaseResponse<OrderResponse>>({
        queryKey: ["orderByTable", tableId],
        queryFn: () => orderApis.getOrderByTableId(String(tableId)),
        enabled: !!tableId,
    });

    const order = data?.data;

    // 🟢 Lấy orderItems theo orderId
    const {
        data: orderItemsRes,
        isLoading: isLoadingOrderItems,
        isError: isErrorOrderItems,
    } = useOrderItemsByOrderId(order?.id?.toString() || "", {
        enabled: !!order?.id,
    });

    if (!tableId) return <p>Chưa chọn bàn</p>;
    if (isLoading) return <p>Đang tải...</p>;
    if (isError) return <p>Không lấy được dữ liệu</p>;
    if (!order) return <p>Không có order chưa thanh toán</p>;
    if (isLoadingOrderItems) return <p>Đang tải món...</p>;
    if (isErrorOrderItems) return <p>Không lấy được món trong order</p>;

    const orderItems = orderItemsRes?.data ?? [];

    // 🟢 Gộp món giống nhau
    const groupedItems = orderItems.reduce((acc: any[], item) => {
        const existing = acc.find((i) => i.menu_item_id === item.menu_item_id);
        if (existing) {
            existing.quantity += item.quantity;
            existing.amount += item.amount;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    // 🟢 Tổng tiền
    const totalAmount = groupedItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">🧾 Order #{order.id}</h3>
            <ul className="space-y-3">
                {groupedItems.map((item) => (
                    <li
                        key={item.menu_item_id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100"
                    >
                        <div>
                            <p className="font-medium text-gray-900">{item.menu_item.name}</p>
                            <p className="text-sm text-gray-500">
                                SL: {item.quantity} × {formatNumberWithCommas(item.menu_item.price)}
                                đ
                            </p>
                        </div>
                        <div className="text-right font-semibold text-blue-600">
                            {formatNumberWithCommas(item.amount)}đ
                        </div>
                    </li>
                ))}
            </ul>

            {/* Tổng tiền */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                <span className="text-xl font-bold text-red-600">
                    {formatNumberWithCommas(totalAmount)}đ
                </span>
            </div>
        </div>
    );
}

export default PaymentTab;
