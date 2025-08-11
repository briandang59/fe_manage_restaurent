import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { CreateStaffRequest } from "@/utils/hooks/useStaff";
import { StaffResponse } from "@/types/response/staff";

const staffApis = {
    getStaff: async (page: number, pageSize: number): Promise<ApiResponse<StaffResponse>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.employees}?populate[account]=true`,
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

    createStaff: async (data: CreateStaffRequest): Promise<BaseResponse<StaffResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.employees}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateStaff: async (
        id: string,
        data: Partial<CreateStaffRequest>
    ): Promise<BaseResponse<StaffResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.employees}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteStaff: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.employees}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default staffApis;
