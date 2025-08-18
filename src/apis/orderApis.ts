import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { OrderResponse } from "@/types/response/order";
import { OrderRequestType } from "@/types/request/order";

interface OrderRequest {
    table_id: number;
    amount: string;
    status?: string;
    memo: string;
}

const orderApis = {
    getOrder: async (page: number, pageSize: number): Promise<ApiResponse<OrderResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.orders}`, {
                params: {
                    page,
                    page_size: pageSize,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getOrderById: async (id: string): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.orders}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getOrderByTableId: async (id: string): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.orders}/${urls.table}/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createOrder: async (data: OrderRequestType): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.orders}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateOrder: async (
        id: string,
        data: Partial<OrderRequest>
    ): Promise<BaseResponse<OrderResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.orders}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteOrder: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.orders}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default orderApis;
