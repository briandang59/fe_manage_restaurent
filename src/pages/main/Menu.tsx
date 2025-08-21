import orderApis from "@/apis/orderApis";
import images from "@/assets/images";
import MenuUI from "@/components/common/MenuUI";
import OrderUI from "@/components/common/OrderUI";
import PaymentTab from "@/components/common/PaymentTab";
import TableUI from "@/components/common/TableUI";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { OrderListProps } from "@/types/common/orderList";
import { MenuItemResponse } from "@/types/response/menuItem";
import { OrderResponse } from "@/types/response/order";
import { TableResponse } from "@/types/response/table";
import { useMenuItems } from "@/utils/hooks/useMenuItem";
import { useCreateOrder, useUpdateOrder } from "@/utils/hooks/useOrder";
import { useCreateOrderItem } from "@/utils/hooks/useOrderItem";
import { useTables } from "@/utils/hooks/useTable";
import { useState } from "react";
import toast from "react-hot-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function MenuPublic() {
    const { data: tables } = useTables(1, 100);
    const { data: menuItems } = useMenuItems(1, 1000);

    const [selectedTable, setSelectedTable] = useState<TableResponse | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("selected");

    const { mutateAsync: mutateAsyncOrder } = useCreateOrder();
    const { mutateAsync: mutateAsyncOrderItem } = useCreateOrderItem();
    const { mutateAsync: mutateUpdateOrder } = useUpdateOrder();

    // state lưu danh sách món theo từng bàn
    const [tableMenuItems, setTableMenuItems] = useState<Record<string, OrderListProps[]>>({});

    const handleOpenSheet = (record?: TableResponse) => {
        setSelectedTable(record || null);
        setIsOpen(true);
    };

    const handleCloseSheet = () => {
        setIsOpen(false);
        setSelectedTable(null);
        setActiveTab("selected");
    };

    // Lấy danh sách món ăn của bàn hiện tại
    const getCurrentTableMenuItems = () => {
        if (!selectedTable?.id) return [];
        return tableMenuItems[selectedTable.id.toString()] || [];
    };

    // chọn thêm món
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
                        menuId: menuItem.id,
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

    // thay đổi số lượng
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
                    item.name === menuItemName ? { ...item, quantity } : item
                ),
            }));
        }
    };

    // lưu order (tạo mới nếu chưa có, thêm item)
    const handleSaveOrder = async () => {
        try {
            if (!selectedTable) return;
            const tableId = selectedTable.id.toString();

            let currentOrder: OrderResponse | null = null;
            try {
                const resOrder = await orderApis.getOrderByTableId(tableId);
                if (resOrder.data && resOrder.data.status === "UnPaid") {
                    currentOrder = resOrder.data;
                }
            } catch {
                currentOrder = null;
            }

            if (!currentOrder) {
                const res = await mutateAsyncOrder({
                    table_id: selectedTable.id,
                });
                currentOrder = res.data;
            }

            const currentItems = getCurrentTableMenuItems();
            if (currentItems.length > 0) {
                await Promise.all(
                    currentItems.map((item) =>
                        mutateAsyncOrderItem({
                            order_id: currentOrder!.id,
                            quantity: item.quantity,
                            menu_item_id: item.menuId,
                            memo: "",
                        })
                    )
                );
            }

            // ✅ Xóa danh sách món tạm ở bàn hiện tại
            setTableMenuItems((prev) => ({
                ...prev,
                [tableId]: [],
            }));

            toast.success("Cập nhật order thành công");
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    // thanh toán bàn
    const handlePaid = async (orderId: number) => {
        try {
            await mutateUpdateOrder({
                id: orderId.toString(),
                table_id: selectedTable!.id,
                status: "Paid",
            });
            toast.success("Thanh toán thành công");
            handleCloseSheet();
        } catch (error) {
            toast.error(`Thanh toán thất bại: ${error}`);
        }
    };

    return (
        <div className="container mx-auto flex flex-col gap-4">
            {/* Danh sách bàn */}
            <div className="grid grid-cols-5 gap-4">
                {tables?.data?.map((table) => (
                    <TableUI key={table.id} record={table} onClick={() => handleOpenSheet(table)} />
                ))}
            </div>

            {/* Sheet chi tiết */}
            <Sheet open={isOpen} onOpenChange={handleCloseSheet}>
                <SheetContent className="flex h-full flex-col">
                    <SheetHeader>
                        <SheetTitle>{selectedTable?.table_name}</SheetTitle>
                    </SheetHeader>

                    {/* Nội dung chính scroll được */}
                    <div className="flex-1 overflow-y-auto pr-2">
                        {/* Menu */}
                        <div className="mt-4 flex flex-col gap-4">
                            <h3 className="text-lg font-medium">Thực đơn món</h3>
                            <div className="grid max-h-[500px] grid-cols-3 gap-4 overflow-y-auto">
                                {menuItems?.data?.map((menuItem) => (
                                    <MenuUI
                                        key={menuItem.id}
                                        menuItem={menuItem}
                                        onClick={handleSelectMenuItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="selected">Danh sách đã chọn</TabsTrigger>
                                <TabsTrigger value="payment">Thanh toán</TabsTrigger>
                            </TabsList>

                            <TabsContent value="selected">
                                <div className="mt-4 flex flex-col gap-2">
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
                            </TabsContent>

                            <TabsContent value="payment">
                                <div className="mt-4 flex flex-col gap-2">
                                    <PaymentTab tableId={selectedTable?.id} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Footer cố định */}
                    <SheetFooter className="mt-2 border-t pt-3">
                        <div className="flex w-full items-center justify-end">
                            <div className="flex items-center gap-2">
                                {activeTab === "selected" && (
                                    <Button variant="default" onClick={handleSaveOrder}>
                                        Lưu
                                    </Button>
                                )}
                                {activeTab === "payment" && selectedTable && (
                                    <Button
                                        variant="destructive"
                                        onClick={async () => {
                                            try {
                                                const res = await orderApis.getOrderByTableId(
                                                    selectedTable.id.toString()
                                                );
                                                if (res.data && res.data.status === "UnPaid") {
                                                    await handlePaid(res.data.id);
                                                } else {
                                                    toast.error(
                                                        "Không tìm thấy order chưa thanh toán"
                                                    );
                                                }
                                            } catch (error) {
                                                toast.error(`Lỗi: ${error}`);
                                            }
                                        }}
                                    >
                                        Thanh toán
                                    </Button>
                                )}
                            </div>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MenuPublic;
