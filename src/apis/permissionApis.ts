import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { PermissionResponse } from "@/types/response/permission";

const permissionApis = {
  getPermissions: async (
    page: number,
    pageSize: number
  ): Promise<ApiResponse<PermissionResponse>> => {
    try {
      const response = await axiosInstance.get(`/${urls.api}/${urls.permissions}`, {
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

  createPermissions: async (data: {
    permission_name: string;
  }): Promise<ApiResponse<PermissionResponse>> => {
    try {
      const response = await axiosInstance.post(`/${urls.api}/${urls.permissions}`, { data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePermissions: async (
    data: {
      permission_name: string;
    },
    id: string
  ): Promise<ApiResponse<PermissionResponse>> => {
    try {
      const response = await axiosInstance.patch(`/${urls.api}/${urls.permissions}/${id}`, {
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletePermissions: async (id: string): Promise<ApiResponse<PermissionResponse>> => {
    try {
      const response = await axiosInstance.delete(`/${urls.api}/${urls.permissions}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default permissionApis;
