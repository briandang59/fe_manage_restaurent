import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { RoleResponse } from "@/types/response/roles";

const roleApis = {
  getRoles: async (page: number, pageSize: number): Promise<ApiResponse<RoleResponse>> => {
    try {
      const response = await axiosInstance.get(`/${urls.api}/${urls.roles}`, {
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

export default roleApis;
