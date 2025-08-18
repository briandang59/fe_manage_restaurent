export interface OrderItemResponse {
    id: number;
    order_id: number;
    menu_item_id: number;
    quantity: number;
    amount: number;
    memo: string;
    order: {
        id: number;
        customer_id: number | null;
        table_id: number;
        amount: number;
        status: string;
        memo: string;
        created_at: string;
        updated_at: string;
    };
    menu_item: {
        id: number;
        name: string;
        description: string;
        price: number;
        category_id: null;
        category: null;
        file_id: number;
        status: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
}
