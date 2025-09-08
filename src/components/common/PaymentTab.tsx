import { useQuery } from "@tanstack/react-query";
import orderApis from "@/apis/orderApis";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";
import { useOrderItemsByOrderId } from "@/utils/hooks/useOrderItem";
import { BaseResponse } from "@/types/response/baseResponse";
import { OrderResponse } from "@/types/response/order";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useState } from "react";
import InvoicePublic from "./InvoicePublic";

function PaymentTab({ tableId }: { tableId?: number }) {
    const [showInvoice, setShowInvoice] = useState(false);

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
        <>
            <div className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-lg">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">🧾 Order #{order.id}</h3>
                            <p className="text-amber-100">Chi tiết thanh toán</p>
                        </div>
                        <Button
                            onClick={() => setShowInvoice(true)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 bg-white text-amber-600 hover:bg-amber-50"
                        >
                            <Printer className="h-4 w-4" />
                            In hóa đơn
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="space-y-4">
                        {groupedItems.map((item) => (
                            <div
                                key={item.menu_item_id}
                                className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50 p-4 transition hover:bg-amber-100"
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {item.menu_item.name}
                                    </p>
                                    <p className="text-sm text-amber-700">
                                        SL: {item.quantity} ×{" "}
                                        {formatNumberWithCommas(item.menu_item.price)}đ
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-amber-600">
                                        {formatNumberWithCommas(item.amount)}đ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tổng tiền */}
                    <div className="mt-6 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-800">💰 Tổng cộng</span>
                            <span className="text-2xl font-bold text-amber-600">
                                {formatNumberWithCommas(totalAmount)}đ
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Modal */}
            {showInvoice && order && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6">
                        <InvoicePublic
                            order={order}
                            orderItems={groupedItems}
                            totalAmount={totalAmount}
                            onClose={() => setShowInvoice(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default PaymentTab;
