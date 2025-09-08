export interface BookingResponse {
    id: number;
    booking_date: string;
    booking_time: string;
    customer_name: string;
    email: string;
    phone_number: string;
    total_persons: number;
    memo: string;
    status: BookingStatus;
    table_id?: number;
    table?: {
        id: number;
        table_name: string;
        position: string;
        seats: number;
    };
    created_at: string;
    updated_at: string;
}

export type BookingStatus =
    | "pending" // Chờ xác nhận
    | "confirmed" // Đã xác nhận
    | "arrived" // Đã đến
    | "dining" // Đang ăn
    | "completed" // Đã thanh toán
    | "cancelled"; // Đã hủy
