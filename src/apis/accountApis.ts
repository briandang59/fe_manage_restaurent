import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { AccountResponse } from "@/types/response/account";

interface AccountRequest {
    user_name: string;
    role_id: number;
}

const accountApis = {
    getAccount: async (page: number, pageSize: number): Promise<ApiResponse<AccountResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.accounts}?page=${page}&page_size=${pageSize}&populate[role]`,
                {
                    params: {
                        page,
                        page_size: pageSize,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAccountById: async (id: string): Promise<BaseResponse<AccountResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.accounts}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createAccount: async (data: AccountRequest): Promise<BaseResponse<AccountResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.accounts}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateAccount: async (
        id: string,
        data: Partial<AccountRequest>
    ): Promise<BaseResponse<AccountResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.accounts}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteAccount: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.accounts}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default accountApis;
