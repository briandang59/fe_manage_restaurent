import images from "@/assets/images";
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
    const { data: tables } = useTables(1, 100);
    const { data: menuItems } = useMenuItems(1, 1000);
    const [selectedTable, setSelectedTable] = useState<TableResponse | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    // Thay đổi state để lưu trữ món ăn theo từng bàn
    const [tableMenuItems, setTableMenuItems] = useState<Record<string, OrderListProps[]>>({});

    const handleOpenSheet = (record?: TableResponse) => {
        setSelectedTable(record || null);
        setIsOpen(true);
    };

    const handleCloseSheet = () => {
        setIsOpen(false);
        setSelectedTable(null);
    };

    // Lấy danh sách món ăn của bàn hiện tại
    const getCurrentTableMenuItems = () => {
        if (!selectedTable?.id) return [];
        return tableMenuItems[selectedTable.id.toString()] || [];
    };

    const handleSelectMenuItem = (menuItem: MenuItemResponse) => {
        if (!selectedTable?.id) return;

        const tableId = selectedTable.id.toString();
        const currentTableItems = tableMenuItems[tableId] || [];

        const isExist = currentTableItems.find((item) => item.name === menuItem.name);

        if (isExist) {
            setTableMenuItems((prev) => ({
                ...prev,
                [tableId]: prev[tableId].map((item) =>
                    item.name === menuItem.name ? { ...item, quantity: item.quantity + 1 } : item
                ),
            }));
        } else {
            setTableMenuItems((prev) => ({
                ...prev,
                [tableId]: [
                    ...(prev[tableId] || []),
                    {
                        name: menuItem.name,
                        image: menuItem?.file?.url || images.banner,
                        price: menuItem.price,
                        quantity: 1,
                        tableId: tableId,
                    },
                ],
            }));
        }
    };

    const handleQuantityChange = (quantity: number, menuItemName: string) => {
        if (!selectedTable?.id) return;

        const tableId = selectedTable.id.toString();

        if (quantity === 0) {
            setTableMenuItems((prev) => ({
                ...prev,
                [tableId]: prev[tableId].filter((item) => item.name !== menuItemName),
            }));
        } else {
            setTableMenuItems((prev) => ({
                ...prev,
                [tableId]: prev[tableId].map((item) =>
                    item.name === menuItemName ? { ...item, quantity: quantity } : item
                ),
            }));
        }
    };

    // Xóa tất cả món ăn của bàn hiện tại
    const handleClearTableMenu = () => {
        if (!selectedTable?.id) return;

        const tableId = selectedTable.id.toString();
        setTableMenuItems((prev) => ({
            ...prev,
            [tableId]: [],
        }));
    };

    // Lấy tổng tiền của bàn hiện tại
    const getCurrentTableTotal = () => {
        const currentItems = getCurrentTableMenuItems();
        return currentItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <div className="container mx-auto flex flex-col gap-4">
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
                            <div className="grid h-fit w-fit grid-cols-3 gap-4 overflow-y-auto rounded-md p-2 shadow-sm">
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
                                onClick={handleClearTableMenu}
                                disabled={getCurrentTableMenuItems().length === 0}
                                className="hover:bg-red-500 hover:text-white"
                            >
                                <Trash />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {selectedTable && getCurrentTableMenuItems().length > 0 ? (
                                getCurrentTableMenuItems().map((menuItem, index) => (
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
                                    {formatNumberWithCommas(getCurrentTableTotal())}đ
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
