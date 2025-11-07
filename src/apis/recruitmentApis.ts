import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { BaseResponse } from "@/types/response/baseResponse";
import { RecruitmentResponseType } from "@/types/response/recruitment";

const recruitmentApis = {
    getRecruitments: async (
        page: number,
        pageSize: number,
        search?: string
    ): Promise<ApiResponse<RecruitmentResponseType>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.recruitments}`, {
                params: {
                    page,
                    page_size: pageSize,
                    ...(search && { search }),
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRecruitment: async (data: {
        title: string;
        content: string;
    }): Promise<BaseResponse<RecruitmentResponseType>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.recruitments}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateRecruitment: async (
        id: string,
        data: {
            title: string;
            content: string;
            is_open?: boolean;
        }
    ): Promise<BaseResponse<RecruitmentResponseType>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.recruitments}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteRecruitment: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.recruitments}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default recruitmentApis;
