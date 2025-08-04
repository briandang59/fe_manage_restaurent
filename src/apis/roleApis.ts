import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { RoleResponse } from "@/types/response/roles";

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

    createRoles: async (data: { permission_name: string }): Promise<ApiResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.roles}`, { data });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateRoles: async (
        data: {
            permission_name: string;
        },
        id: string
    ): Promise<ApiResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.roles}/${id}`, {
                data,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteRoles: async (id: string): Promise<ApiResponse<RoleResponse>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.roles}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default roleApis;
