export interface AttendanceResponse {
    id: number;
    shift_schedule_id: number;
    actual_start_time: string;
    actual_end_time: string;
    hours: number;
    shift_schedule: {
        id: number;
        employee_id: number;
        shift_id: number;
        date: string;
        employee: {
            id: number;
            full_name: string;
            gender: true;
            birthday: string;
            phone_number: string;
            email: string;
            schedule_type: string;
            address: string;
            join_date: string;
            base_salary: number;
            salary_per_hour: number;
            account_id: number;
            avatar_file_id: null;
            created_at: string;
            updated_at: string;
        };
        shift: {
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
    };
    created_at: string;
    updated_at: string;
}
