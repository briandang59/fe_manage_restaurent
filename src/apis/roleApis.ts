import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { RoleResponse } from "@/types/response/roles";
import { BaseResponse } from "@/types/response/baseResponse";

const roleApis = {
    getRoles: async (
        page: number,
        pageSize: number,
        search?: string
    ): Promise<ApiResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.roles}?populate[permissions]=true`,
                {
                    params: {
                        page,
                        page_size: pageSize,
                        ...(search && { search }),
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRole: async (data: {
        role_name: string;
        permissions: number[];
    }): Promise<BaseResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.roles}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateRole: async (
        id: string,
        data: { role_name: string; permissions: number[] }
    ): Promise<BaseResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.roles}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteRole: async (id: string): Promise<BaseResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.roles}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default roleApis;
