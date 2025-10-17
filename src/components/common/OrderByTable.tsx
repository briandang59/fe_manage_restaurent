import { OrderItemResponse } from "@/types/response/orderItem";
import images from "@/assets/images";

interface Props {
    orderItem: OrderItemResponse;
    onUpdateStatus?: (status: "OnProgress" | "Done") => void; // Thêm type cụ thể cho status
}

const STATUS_MAPPER: Record<string, { label: string; bgColor: string }> = {
    Pending: { label: "Đang chờ", bgColor: "bg-red-500" },
    OnProgress: { label: "Đang nấu", bgColor: "bg-yellow-500" },
    Done: { label: "Đã xong", bgColor: "bg-green-600" },
};

export default function OrderCard({ orderItem, onUpdateStatus }: Props) {
    // 1. Tối ưu hóa logic trạng thái
    const { status, order, created_at, memo, quantity } = orderItem;
    const { name, file } = orderItem.menu_item;

    const currentStatus = STATUS_MAPPER[status] || { label: status, bgColor: "bg-gray-400" };

    const showOnProgressButton = status === "Pending";
    const showDoneButton = status === "OnProgress";

    // Hàm chung để xử lý onClick, đơn giản hóa code JSX
    const handleUpdate = (newStatus: "OnProgress" | "Done") => {
        onUpdateStatus?.(newStatus);
    };

    return (
        <div className="flex flex-col rounded-2xl border bg-white p-4 shadow-md">
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-bold">{order.table.table_name}</h2>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${currentStatus.bgColor}`}
                >
                    {currentStatus.label}
                </span>
            </div>
            <p className="mb-4 text-sm text-gray-500">
                Order #{order.id} • {new Date(created_at).toLocaleTimeString()}
            </p>

            {/* Body */}
            <div className="mb-4 flex flex-col items-center">
                <img
                    // Sử dụng Optional Chaining an toàn hơn
                    src={file?.url || images.banner}
                    alt={name}
                    className="h-32 w-32 rounded-lg object-cover"
                />
                <p className="mt-2 text-lg font-bold">
                    {name} × {quantity}
                </p>
                {memo && <p className="text-sm italic text-gray-600">{memo}</p>}
            </div>

            {/* Footer */}
            {status !== "Done" && (
                <div className="mt-auto flex gap-2">
                    {/* Nút Đang nấu */}
                    {showOnProgressButton && (
                        <button
                            onClick={() => handleUpdate("OnProgress")}
                            className="flex-1 rounded-lg bg-yellow-500 py-2 font-semibold text-white transition-colors hover:bg-yellow-600"
                        >
                            Đang nấu
                        </button>
                    )}

                    {/* Nút Xong */}
                    {showDoneButton && (
                        <button
                            onClick={() => handleUpdate("Done")}
                            className="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white transition-colors hover:bg-green-700"
                        >
                            Xong
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
