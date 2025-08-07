import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { ShiftResponse } from "@/types/response/shift";
import shiftApis from "@/apis/shiftApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface ShiftRequest {
    shift_name: string;
    start_time: string;
    end_time: string;
}

export const shiftQueryKeys = {
    all: ["shift"] as const,
    lists: () => [...shiftQueryKeys.all, "list"] as const,
    list: (filters: string) => [...shiftQueryKeys.lists(), { filters }] as const,
    details: () => [...shiftQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...shiftQueryKeys.details(), id] as const,
};

export const useShifts = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...shiftQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<ShiftResponse>> => {
            return await shiftApis.getShift(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateShift = (): UseMutationResult<
    BaseResponse<ShiftResponse>,
    Error,
    ShiftRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ShiftRequest): Promise<BaseResponse<ShiftResponse>> => {
            return await shiftApis.createShift(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: shiftQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo ca làm việc:", error);
        },
    });
};

export const useUpdateShift = (): UseMutationResult<
    BaseResponse<ShiftResponse>,
    Error,
    ShiftRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: ShiftRequest & { id: string }
        ): Promise<BaseResponse<ShiftResponse>> => {
            return await shiftApis.updateShift(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: shiftQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật ca làm việc:", error);
        },
    });
};

export const useDeleteShift = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await shiftApis.deleteShift(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: shiftQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa ca làm việc:", error);
        },
    });
};
