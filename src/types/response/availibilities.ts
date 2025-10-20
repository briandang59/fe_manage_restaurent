// Định nghĩa interface cho mối quan hệ Shift
export interface Shift {
    id: number;
    shift_name: string;
    code: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
}

// Định nghĩa interface cho mối quan hệ Employee
export interface Employee {
    id: number;
    full_name: string;
    gender: boolean;
    birthday: string;
    phone_number: string;
    email: string;
    schedule_type: string; // Có thể là 'PARTTIME' | 'FULLTIME'
    address: string;
    join_date: string;
    base_salary: number;
    salary_per_hour: number;
    account_id: number;
    avatar_file_id: number | null;
    created_at: string;
    updated_at: string;
}

// Interface chính đã được cập nhật để bao gồm Employee
export interface AvailibilitiesResponse {
    id: number;
    employee_id: number;
    shift_id: number;
    day_of_week: string;
    is_available: boolean;

    // 🚨 THÊM TRƯỜNG employee VÀO ĐÂY
    employee?: Employee; // Sử dụng dấu '?' để cho phép nó là tùy chọn (nếu không được preload)

    shifts?: Shift; // Sử dụng interface Shift đã định nghĩa

    created_at: string;
    updated_at: string;
}
