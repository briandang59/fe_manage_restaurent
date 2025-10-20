export interface EmployeeRespone {
    id: number;
    full_name: string;
    gender: boolean;
    birthday: string;
    phone_number: string;
    email: string;
    schedule_type: string;
    address: string;
    join_date: string;
    base_salary: number;
    salary_per_hour: number;
    account_id: number;
    account: {
        id: number;
        user_name: string;
        password: string;
        role_id: number;
        created_at: string;
        updated_at: string;
    };
    avatar_file_id: null;
    created_at: string;
    updated_at: string;
}
