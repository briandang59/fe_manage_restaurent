import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { CreateMenuItemRequest } from "@/utils/hooks/useMenuItem";
import { ApiResponse } from "@/types/response/pagination";
import { CustomerResponse } from "@/types/response/customer";

const customerApis = {
    getCustomer: async (page: number, pageSize: number): Promise<ApiResponse<CustomerResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.customers}?populate[file]=true`,
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

    getCustomerById: async (id: string): Promise<BaseResponse<CustomerResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.customers}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCustomer: async (
        data: CreateMenuItemRequest
    ): Promise<BaseResponse<CustomerResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.customers}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCustomer: async (
        id: string,
        data: Partial<CreateMenuItemRequest>
    ): Promise<BaseResponse<CustomerResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.customers}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteCustomer: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.customers}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default customerApis;
