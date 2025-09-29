import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { OrderItemResponse } from "@/types/response/orderItem";
import { OrderItemRequestType } from "@/types/request/order";

const orderItemApis = {
    getOrderItem: async (
        page: number,
        pageSize: number
    ): Promise<ApiResponse<OrderItemResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.orderitems}`, {
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

    getOrderItemById: async (id: string): Promise<BaseResponse<OrderItemResponse[]>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.orderitems}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getOrderItemByOrderId: async (id: string): Promise<BaseResponse<OrderItemResponse[]>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.orderitems}/${urls.order}/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createOrderItem: async (
        data: OrderItemRequestType
    ): Promise<BaseResponse<OrderItemResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.orderitems}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateOrderItem: async (
        id: string,
        data: Partial<OrderItemRequestType>
    ): Promise<BaseResponse<OrderItemResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.orderitems}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteOrderItem: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.orderitems}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default orderItemApis;
