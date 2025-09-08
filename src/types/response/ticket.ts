export type TicketResponseType = {
    id: number;
    ingredient_id: number;
    quantity: number;
    unit: string;
    ticket_type: string;
    ingredient: {
        id: number;
        name: string;
        description: string;
        quantity: number;
        warning_quantity: number;
        supplier: string;
        unit: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
};
