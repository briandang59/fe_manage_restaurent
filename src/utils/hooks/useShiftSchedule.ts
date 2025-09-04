import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { ShiftScheduleResponseType } from "@/types/response/shiftSchedule";
import shiftScheduleApis from "@/apis/shiftScheduleApis";

export const shiftScheduleQueryKeys = {
    all: ["shiftSchedule"] as const,
    lists: () => [...shiftScheduleQueryKeys.all, "list"] as const,
    list: (filters: string) => [...shiftScheduleQueryKeys.lists(), { filters }] as const,
    details: () => [...shiftScheduleQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...shiftScheduleQueryKeys.details(), id] as const,
};

export const useShiftSchedule = (page: number, pageSize: number, employee_id: number) => {
    return useQuery({
        queryKey: [...shiftScheduleQueryKeys.lists(), page, pageSize, employee_id],
        queryFn: async (): Promise<ApiResponse<ShiftScheduleResponseType>> => {
            return await shiftScheduleApis.getShiftSchedule(page, pageSize, employee_id);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
