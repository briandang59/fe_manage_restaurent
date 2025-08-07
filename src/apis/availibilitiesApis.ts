import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { CreateMenuItemRequest } from "@/utils/hooks/useMenuItem";
import { ApiResponse } from "@/types/response/pagination";
import { AvailibilitiesResponse } from "@/types/response/availibilities";

const availibilitiesApis = {
    getAvailibilities: async (
        page: number,
        pageSize: number
    ): Promise<ApiResponse<AvailibilitiesResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.availibilities}?populate[file]=true`,
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

    getAvailibilitiesById: async (id: string): Promise<BaseResponse<AvailibilitiesResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.availibilities}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createAvailibilities: async (
        data: CreateMenuItemRequest
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
        data: Partial<CreateMenuItemRequest>
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
