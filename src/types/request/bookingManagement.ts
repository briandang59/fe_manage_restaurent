export interface BookingUpdateRequest {
    status: string;
    table_id?: number;
    memo?: string;
}

export interface BookingFilterRequest {
    date?: string;
    status?: string;
    page?: number;
    page_size?: number;
}
