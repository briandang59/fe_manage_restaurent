export type OrderRequestType = {
    table_id: number;
};

export type OrderItemRequestType = {
    order_id: number;
    quantity: number;
    menu_item_id: number;
    memo: string;
};
