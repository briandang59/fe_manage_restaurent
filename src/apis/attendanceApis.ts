import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";
import { ApiResponse } from "@/types/response/pagination";
import { AttendanceResponse } from "@/types/response/attendance";

interface AttendanceRequest {
    shift_schedule_id: number;
    actual_start_time: string;
    actual_end_time: string;
}

interface AttendanceUpdateRequest {
    actual_start_time?: string;
    actual_end_time?: string;
    hours?: number;
}

const attendanceApis = {
    getAttendance: async (
        page: number,
        pageSize: number,
        employee_id?: number
    ): Promise<ApiResponse<AttendanceResponse>> => {
        try {
            const params: Record<string, any> = {
                page,
                page_size: pageSize,
                "populate[shift]": true,
            };

            if (employee_id !== undefined) {
                params.employee_id = employee_id;
            }

            const response = await axiosInstance.get(`/${urls.api}/${urls.attendances}`, {
                params,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAttendanceById: async (id: string): Promise<BaseResponse<AttendanceResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.attendances}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createAttendance: async (
        data: AttendanceRequest
    ): Promise<BaseResponse<AttendanceResponse>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.attendances}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateAttendance: async (
        id: string,
        data: AttendanceUpdateRequest
    ): Promise<BaseResponse<AttendanceResponse>> => {
        try {
            const response = await axiosInstance.patch(
                `/${urls.api}/${urls.attendances}/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteAttendance: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.attendances}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default attendanceApis;
