import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { AvailibilitiesResponse } from "@/types/response/availibilities";
import availibilitiesApis from "@/apis/availibilitiesApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface AvailibilitiesRequest {
    shift_id: number;
    employee_id: number;
    date: string;
    status: string;
}

export const availibilitiesQueryKeys = {
    all: ["availibilities"] as const,
    lists: () => [...availibilitiesQueryKeys.all, "list"] as const,
    list: (filters: string) => [...availibilitiesQueryKeys.lists(), { filters }] as const,
    details: () => [...availibilitiesQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...availibilitiesQueryKeys.details(), id] as const,
};

export const useAvailibilities = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...availibilitiesQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<AvailibilitiesResponse>> => {
            return await availibilitiesApis.getAvailibilities(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateAvailibilities = (): UseMutationResult<
    BaseResponse<AvailibilitiesResponse>,
    Error,
    AvailibilitiesRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: AvailibilitiesRequest
        ): Promise<BaseResponse<AvailibilitiesResponse>> => {
            return await availibilitiesApis.createAvailibilities(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: availibilitiesQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo lịch rảnh:", error);
        },
    });
};

export const useUpdateAvailibilities = (): UseMutationResult<
    BaseResponse<AvailibilitiesResponse>,
    Error,
    AvailibilitiesRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: AvailibilitiesRequest & { id: string }
        ): Promise<BaseResponse<AvailibilitiesResponse>> => {
            return await availibilitiesApis.updateAvailibilities(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: availibilitiesQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật lịch rảnh:", error);
        },
    });
};

export const useDeleteAvailibilities = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await availibilitiesApis.deleteAvailibilities(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: availibilitiesQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa lịch rảnh:", error);
        },
    });
};
