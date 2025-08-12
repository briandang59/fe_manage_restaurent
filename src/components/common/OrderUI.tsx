import { OrderListProps } from "@/types/common/orderList";
import Image from "../ui/image";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";

interface OrderUIProps {
    orderList: OrderListProps;
    onQuantityChange: (quantity: number) => void;
}
function OrderUI({ orderList, onQuantityChange }: OrderUIProps) {
    return (
        <div className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 p-2 shadow-sm">
            <div className="flex items-center gap-2">
                <Image
                    src={orderList.image}
                    alt={orderList.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                />
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">{orderList.name}</p>
                    <p className="text-md text-gray-500">
                        {formatNumberWithCommas(orderList.price)}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onQuantityChange(orderList.quantity - 1)}
                >
                    <Minus />
                </Button>
                <p className="text-md text-gray-500">{orderList.quantity}</p>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onQuantityChange(orderList.quantity + 1)}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    );
}

export default OrderUI;
