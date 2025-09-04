export interface AvailibilitiesResponse {
    id: number;
    employee_id: number;
    shift_id: number;
    day_of_week: string;
    is_available: boolean;
    shifts: {
        id: number;
        shift_name: string;
        code: string;
        start_time: string;
        end_time: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
}
