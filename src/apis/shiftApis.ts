import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { CreateMenuItemRequest } from "@/utils/hooks/useMenuItem";
import { ApiResponse } from "@/types/response/pagination";
import { ShiftResponse } from "@/types/response/shift";

const shiftApis = {
    getShift: async (page: number, pageSize: number): Promise<ApiResponse<ShiftResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.shifts}?populate[file]=true`,
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

    getShiftById: async (id: string): Promise<BaseResponse<ShiftResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.shifts}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createShift: async (data: CreateMenuItemRequest): Promise<BaseResponse<ShiftResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.shifts}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateShift: async (
        id: string,
        data: Partial<CreateMenuItemRequest>
    ): Promise<BaseResponse<ShiftResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.shifts}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteShift: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.shifts}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default shiftApis;
