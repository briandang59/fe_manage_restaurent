import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { TableResponse } from "@/types/response/table";
import { TableRequest } from "@/utils/hooks/useTable";

const tableApis = {
    getTable: async (page: number, pageSize: number): Promise<ApiResponse<TableResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.tables}`, {
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

    getTableById: async (id: string): Promise<BaseResponse<TableResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.tables}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createTable: async (data: TableRequest): Promise<BaseResponse<TableResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.tables}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTable: async (
        id: string,
        data: Partial<TableRequest>
    ): Promise<BaseResponse<TableResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.tables}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTable: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.tables}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default tableApis;
