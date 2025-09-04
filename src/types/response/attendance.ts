export interface AttendanceResponse {
    id: number;
    shift_schedule_id: number;
    actual_start_time: string; // ISO datetime
    actual_end_time: string; // ISO datetime
    hours: number;

    shift_schedule: {
        id: number;
        employee_id: number;
        shift_id: number;
        date: string; // YYYY-MM-DD
        created_at: string; // ISO datetime
        updated_at: string; // ISO datetime
    };

    created_at: string; // ISO datetime
    updated_at: string; // ISO datetime
}
