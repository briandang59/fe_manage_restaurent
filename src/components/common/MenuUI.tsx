import { MenuItemResponse } from "@/types/response/menuItem";
import Image from "../ui/image";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";
import images from "@/assets/images";

interface MenuUIProps {
    menuItem: MenuItemResponse;
    onClick?: (item: MenuItemResponse) => void;
    type?: "order" | "home";
}
function MenuUI({ menuItem, onClick, type }: MenuUIProps) {
    if (type === "home") {
        return (
            <div className="h-[400px] scale-100 cursor-pointer overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Image src={images.banner} alt="menu item" className="h-[250px] w-full" />
                <div className="flex h-[50%] flex-col gap-4 p-4">
                    <h3 className="text-[22px] font-bold">{menuItem.name}</h3>
                    <p>{menuItem.description}</p>
                    <p className="text-[20px] font-semibold text-red-600">
                        {formatNumberWithCommas(menuItem.price)} VNĐ
                    </p>
                </div>
            </div>
        );
    }

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
