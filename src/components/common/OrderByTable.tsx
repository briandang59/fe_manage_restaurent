import { OrderItemResponse } from "@/types/response/orderItem";
import images from "@/assets/images";

interface Props {
    orderItem: OrderItemResponse;
    onUpdateStatus?: (status: string) => void;
}

export default function OrderCard({ orderItem, onUpdateStatus }: Props) {
    return (
        <div className="flex flex-col rounded-2xl border bg-white p-4 shadow-md">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold">🪑 {orderItem.order.table.table_name}</h2>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        orderItem.status === "Pending"
                            ? "bg-red-500"
                            : orderItem.status === "Cooking"
                              ? "bg-yellow-500"
                              : "bg-green-600"
                    }`}
                >
                    {orderItem.status}
                </span>
            </div>
            <p className="mb-4 text-sm text-gray-500">
                Order #{orderItem.order.id} • {new Date(orderItem.created_at).toLocaleTimeString()}
            </p>

            {/* Body */}
            <div className="mb-4 flex flex-col items-center">
                <img
                    src={orderItem?.menu_item?.file?.url || images.banner}
                    alt="food"
                    className="h-32 w-32 rounded-lg object-cover"
                />
                <p className="mt-2 text-lg font-bold">
                    🍽 {orderItem.menu_item.name} × {orderItem.quantity}
                </p>
                {orderItem.memo && (
                    <p className="text-sm italic text-gray-600">📌 {orderItem.memo}</p>
                )}
            </div>

            {/* Footer */}
            <div className="mt-auto flex gap-2">
                <button
                    onClick={() => onUpdateStatus?.("Cooking")}
                    className="flex-1 rounded-lg bg-yellow-500 py-2 font-semibold text-white hover:bg-yellow-600"
                >
                    Đang nấu
                </button>
                <button
                    onClick={() => onUpdateStatus?.("Served")}
                    className="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
                >
                    Xong
                </button>
            </div>
        </div>
    );
}
