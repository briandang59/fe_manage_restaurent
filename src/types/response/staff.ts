export interface StaffResponse {
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
  account_id: number | null;
  avatar_file_id: number | null;
  created_at: string;
  updated_at: string;
}
