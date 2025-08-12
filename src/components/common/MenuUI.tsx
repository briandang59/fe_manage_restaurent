import { MenuItemResponse } from "@/types/response/menuItem";
import Image from "../ui/image";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";

interface MenuUIProps {
    menuItem: MenuItemResponse;
    onClick?: (item: MenuItemResponse) => void;
}
function MenuUI({ menuItem, onClick }: MenuUIProps) {
    return (
        <button
            className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-gray-200 p-2 shadow-sm"
            onClick={() => onClick?.(menuItem)}
        >
            <Image
                src={menuItem.file.url}
                alt={menuItem.name}
                width={100}
                height={100}
                className="rounded-md"
            />
            <p className="text-sm font-medium">{menuItem.name}</p>
            <p className="text-md text-gray-500">{formatNumberWithCommas(menuItem.price)}</p>
        </button>
    );
}

export default MenuUI;
