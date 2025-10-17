import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { ShiftScheduleResponseType } from "@/types/response/shiftSchedule";

const shiftScheduleApis = {
    getShiftSchedule: async (
        page: number,
        pageSize: number,
        employee_id: number
    ): Promise<ApiResponse<ShiftScheduleResponseType>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.shifts_chedules}?populate[employee]&populate[shift]&page=${page}&page_size=${pageSize}&employee_id=${employee_id}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default shiftScheduleApis;
