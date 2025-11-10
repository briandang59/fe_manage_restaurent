import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";

// Định nghĩa kiểu dữ liệu cho response login
interface LoginResponse {
    token: string;
    user: {
        id: number;
        user_name: string;
        role_id: number;
        created_at: string;
        updated_at: string;
    };
    role: {
        id: number;
        role_name: string;
    };
    employee: {
        address: string;
        avatar_file_id: number;
        base_salary: number;
        birthday: string;
        email: string;
        full_name: string;
        gender: boolean;
        id: number;
        join_date: string;
        phone_number: string;
        salary_per_hour: number;
        schedule_type: string;
    };
}

const authApis = {
    login: async (username: string, password: string): Promise<BaseResponse<LoginResponse>> => {
        try {
            const response = await axiosInstance.post(
                `/${urls.auth}/${urls.accounts}/${urls.login}`,
                {
                    user_name: username,
                    password,
                }
            );

            // Không tự động lưu token ở đây, để useAuth handle

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default authApis;
