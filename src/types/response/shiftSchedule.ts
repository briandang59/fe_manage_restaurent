export type ShiftScheduleResponseType = {
    id: number;
    employee_id: number;
    shift_id: number;
    date: string; // ví dụ "2025-09-08"

    employee: {
        id: number;
        full_name: string;
        gender: boolean;
        birthday: string; // ISO date string
        phone_number: string;
        email: string;
        schedule_type: "FULLTIME" | "PARTTIME" | string; // union nếu chỉ có vài giá trị
        address: string;
        join_date: string;
        base_salary: number;
        salary_per_hour: number;
        account_id: number;
        avatar_file_id: number | null;
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
