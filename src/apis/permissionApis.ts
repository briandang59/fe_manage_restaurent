import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { PermissionResponse } from "@/types/response/permission";
import { BaseResponse } from "@/types/response/baseResponse";

const permissionApis = {
    getPermissions: async (
        page: number,
        pageSize: number,
        search?: string
    ): Promise<ApiResponse<PermissionResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.permissions}?populate[roles]=true`,
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

    createPermission: async (data: {
        permission_name: string;
    }): Promise<BaseResponse<PermissionResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.permissions}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updatePermission: async (
        id: string,
        data: { permission_name: string }
    ): Promise<BaseResponse<PermissionResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.permissions}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deletePermission: async (id: string): Promise<BaseResponse<PermissionResponse>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.permissions}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default permissionApis;
