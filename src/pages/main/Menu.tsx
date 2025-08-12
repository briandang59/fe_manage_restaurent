import MenuUI from "@/components/common/MenuUI";
import OrderUI from "@/components/common/OrderUI";
import TableUI from "@/components/common/TableUI";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { OrderListProps } from "@/types/common/orderList";
import { MenuItemResponse } from "@/types/response/menuItem";
import { TableResponse } from "@/types/response/table";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";
import { useMenuItems } from "@/utils/hooks/useMenuItem";
import { useTables } from "@/utils/hooks/useTable";
import { Trash } from "lucide-react";
import { useState } from "react";

function MenuPublic() {
    const { data: tables } = useTables(1, 10);
    const { data: menuItems } = useMenuItems(1, 10);
    const [selectedTable, setSelectedTable] = useState<TableResponse | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMenuList, setSelectedMenuList] = useState<OrderListProps[]>([]);

    const handleOpenSheet = (record?: TableResponse) => {
        setSelectedTable(record || null);
        setIsOpen(true);
    };
    const handleCloseSheet = () => {
        setIsOpen(false);
        setSelectedTable(null);
    };

    const handleSelectMenuItem = (menuItem: MenuItemResponse) => {
        const isExist = selectedMenuList.find((item) => item.name === menuItem.name);
        if (isExist) {
            setSelectedMenuList((prev) =>
                prev.map((item) =>
                    item.name === menuItem.name ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setSelectedMenuList((prev) => [
                ...prev,
                {
                    name: menuItem.name,
                    image: menuItem.file.url,
                    price: menuItem.price,
                    quantity: 1,
                },
            ]);
        }
    };

    const handleQuantityChange = (quantity: number, menuItemName: string) => {
        if (quantity === 0) {
            setSelectedMenuList((prev) => prev.filter((item) => item.name !== menuItemName));
        } else {
            setSelectedMenuList((prev) =>
                prev.map((item) =>
                    item.name === menuItemName ? { ...item, quantity: quantity } : item
                )
            );
        }
        setSelectedMenuList((prev) =>
            prev.map((item) =>
                item.name === menuItemName ? { ...item, quantity: quantity } : item
            )
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4">
                {tables?.data?.map((table) => (
                    <TableUI key={table.id} record={table} onClick={() => handleOpenSheet(table)} />
                ))}
            </div>
            <Sheet open={isOpen} onOpenChange={handleCloseSheet}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{selectedTable?.table_name}</SheetTitle>
                    </SheetHeader>
                    <div className="my-4 flex max-h-[800px] flex-col gap-4 overflow-y-auto">
                        <div className="flex min-h-[500px] flex-col gap-4">
                            <h3 className="text-lg font-medium">Thực đơn món</h3>
                            <div className="grid h-fit w-fit grid-cols-4 gap-4 overflow-y-auto rounded-md p-2 shadow-sm">
                                {menuItems?.data?.map((menuItem) => (
                                    <MenuUI
                                        key={menuItem.id}
                                        menuItem={menuItem}
                                        onClick={handleSelectMenuItem}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-lg font-medium">Danh sách đã chọn</h3>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedMenuList([])}
                                disabled={selectedMenuList.length === 0}
                                className="hover:bg-red-500 hover:text-white"
                            >
                                <Trash />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {selectedMenuList.length > 0 ? (
                                selectedMenuList.map((menuItem, index) => (
                                    <OrderUI
                                        key={index}
                                        orderList={menuItem}
                                        onQuantityChange={(quantity: number) =>
                                            handleQuantityChange(quantity, menuItem.name)
                                        }
                                    />
                                ))
                            ) : (
                                <div className="flex min-h-[200px] items-center justify-center py-4">
                                    <p>Chưa có món nào</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <SheetFooter className="fixed bottom-2 left-0 right-6">
                        <div className="flex w-[520px] items-center justify-between gap-2 bg-white">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium"> Tổng tiền: </p>
                                <p className="text-md font-medium text-red-500">
                                    {formatNumberWithCommas(
                                        selectedMenuList.reduce(
                                            (acc, item) => acc + item.price * item.quantity,
                                            0
                                        )
                                    )}
                                    đ
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button type="submit" variant="default">
                                    Lưu
                                </Button>
                                <Button type="submit" variant="destructive">
                                    Thanh toán
                                </Button>
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MenuPublic;
