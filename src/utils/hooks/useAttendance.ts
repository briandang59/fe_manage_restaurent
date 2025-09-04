import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { AttendanceResponse } from "@/types/response/attendance";
import attendanceApis from "@/apis/attendanceApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface AttendanceRequest {
    shift_schedule_id: number;
    actual_start_time: string;
    actual_end_time: string;
}

interface AttendanceUpdateRequest {
    actual_start_time?: string;
    actual_end_time?: string;
}

export const attendanceQueryKeys = {
    all: ["attendance"] as const,
    lists: () => [...attendanceQueryKeys.all, "list"] as const,
    list: (filters: string) => [...attendanceQueryKeys.lists(), { filters }] as const,
    details: () => [...attendanceQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...attendanceQueryKeys.details(), id] as const,
};

export const useAttendances = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...attendanceQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<AttendanceResponse>> => {
            return await attendanceApis.getAttendance(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateAttendance = (): UseMutationResult<
    BaseResponse<AttendanceResponse>,
    Error,
    AttendanceRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AttendanceRequest): Promise<BaseResponse<AttendanceResponse>> => {
            return await attendanceApis.createAttendance(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo chấm công:", error);
        },
    });
};

export const useUpdateAttendance = (): UseMutationResult<
    BaseResponse<AttendanceResponse>,
    Error,
    AttendanceUpdateRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: AttendanceUpdateRequest & { id: string }
        ): Promise<BaseResponse<AttendanceResponse>> => {
            return await attendanceApis.updateAttendance(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật chấm công:", error);
        },
    });
};

export const useDeleteAttendance = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await attendanceApis.deleteAttendance(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa chấm công:", error);
        },
    });
};
