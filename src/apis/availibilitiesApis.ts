import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { AvailibilitiesResponse } from "@/types/response/availibilities";

export interface AvailibilitiesRequest {
    id?: number;
    employee_id: number;
    shift_id: number;
    day_of_week: string;
    is_available: boolean;
}

const availibilitiesApis = {
    getAvailibilities: async (
        page: number,
        pageSize: number,
        employee_id?: number
    ): Promise<ApiResponse<AvailibilitiesResponse>> => {
        try {
            const params: Record<string, any> = {
                page,
                page_size: pageSize,
                "populate[shift]": true,
            };

            if (employee_id) {
                params.employee_id = employee_id;
            }

            const response = await axiosInstance.get(`/${urls.api}/${urls.availibilities}`, {
                params: params,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAvailibilitiesById: async (id: string): Promise<BaseResponse<AvailibilitiesResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.availibilities}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createAvailibilities: async (
        data: AvailibilitiesRequest
    ): Promise<BaseResponse<AvailibilitiesResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.availibilities}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateAvailibilities: async (
        id: string,
        data: Partial<AvailibilitiesRequest>
    ): Promise<BaseResponse<AvailibilitiesResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.availibilities}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteAvailibilities: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(
                `/${urls.api}/${urls.availibilities}/${id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default availibilitiesApis;
