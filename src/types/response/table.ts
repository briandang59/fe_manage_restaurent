export interface TableResponse {
    id: number;
    table_name: string;
    position: string;
    seats: number;
    memo: string;
    is_occupied: boolean;
    created_at: string;
    updated_at: string;
}
