import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { tokenManager } from "@/lib/tokenManager";
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

    logout: async (): Promise<void> => {
        try {
            // Gọi API logout nếu cần
            await axiosInstance.post(`/${urls.auth}/logout`);
        } catch (error) {
            // Vẫn xóa token ngay cả khi API logout thất bại
            console.error("Logout API error:", error);
        } finally {
            // Luôn xóa token khỏi localStorage
            tokenManager.removeToken();
        }
    },

    // Kiểm tra token có hợp lệ không
    verifyToken: async (): Promise<BaseResponse<{ valid: boolean }>> => {
        try {
            const response = await axiosInstance.get(`/${urls.auth}/verify`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default authApis;
