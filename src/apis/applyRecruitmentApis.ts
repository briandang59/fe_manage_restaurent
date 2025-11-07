import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApplyRecruitmentResponseType } from "@/types/response/applyRecruitment";

interface Payload {
    recruitment_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    cv_id: number;
}
const recruitmentApis = {
    getApplyRecruitments: async (
        page: number,
        pageSize: number,
        search?: string
    ): Promise<ApiResponse<ApplyRecruitmentResponseType>> => {
        try {
            const params: any = {
                page,
                page_size: pageSize,
                ...(search && { search }),
                "populate[CV]": true,
                "populate[Recruitment]": true,
            };

            const response = await axiosInstance.get(`/${urls.api}/${urls.apply_recruitment}`, {
                params,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createApplyRecruitments: async (
        data: Payload
    ): Promise<BaseResponse<ApplyRecruitmentResponseType>> => {
        try {
            const response = await axiosInstance.post(
                `/${urls.api}/${urls.apply_recruitment}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateApplyRecruitments: async (
        id: string,
        data: Payload
    ): Promise<BaseResponse<ApplyRecruitmentResponseType>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.apply_recruitment}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default recruitmentApis;
