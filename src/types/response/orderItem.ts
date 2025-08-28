export interface OrderItemResponse {
    id: number;
    order_id: number;
    menu_item_id: number;
    quantity: number;
    amount: number;
    memo: string;
    status: string;
    order: {
        id: number;
        customer_id: number | null;
        table_id: number;
        amount: number;
        status: string;
        memo: string;
        table: {
            id: number;
            table_name: string;
            position: string;
            seats: number;
            memo: string;
            created_at: string;
            updated_at: string;
        };
        created_at: string;
        updated_at: string;
    };
    menu_item: {
        id: number;
        name: string;
        description: string;
        price: number;
        category_id: number;
        category: {
            id: number;
            category_name: string;
            created_at: string;
            updated_at: string;
        } | null;
        file_id: number;
        file: {
            id: number;
            file_name: string;
            url: string;
            mime_type: string;
            size: number;
            public_id: string;
            resource_type: string;
            folder: string;
            created_at: string;
            updated_at: string;
        } | null;
        status: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
}
