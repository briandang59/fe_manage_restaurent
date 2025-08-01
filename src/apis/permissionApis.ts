import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { PermissionResponse } from "@/types/response/permission";

const permissionApis = {
  getPermissions: async (page: number, pageSize: number): Promise<ApiResponse<PermissionResponse>> => {
    try {
      const response = await axiosInstance.get(`/${urls.api}/${urls.permissions}`, {
        params: {
          page,
          page_size: pageSize
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default permissionApis;
