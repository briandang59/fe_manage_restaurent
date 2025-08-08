import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { TableResponse } from "@/types/response/table";
import tableApis from "@/apis/tableApis";
import { BaseResponse } from "@/types/response/baseResponse";

export interface TableRequest {
    table_name: string;
}

export const tableQueryKeys = {
    all: ["table"] as const,
    lists: () => [...tableQueryKeys.all, "list"] as const,
    list: (filters: string) => [...tableQueryKeys.lists(), { filters }] as const,
    details: () => [...tableQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...tableQueryKeys.details(), id] as const,
};

export const useTables = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...tableQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<TableResponse>> => {
            return await tableApis.getTable(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateTable = (): UseMutationResult<
    BaseResponse<TableResponse>,
    Error,
    TableRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TableRequest): Promise<BaseResponse<TableResponse>> => {
            return await tableApis.createTable(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tableQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo bàn:", error);
        },
    });
};

export const useUpdateTable = (): UseMutationResult<
    BaseResponse<TableResponse>,
    Error,
    TableRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: TableRequest & { id: string }
        ): Promise<BaseResponse<TableResponse>> => {
            return await tableApis.updateTable(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tableQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật bàn:", error);
        },
    });
};

export const useDeleteTable = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await tableApis.deleteTable(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tableQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa bàn:", error);
        },
    });
};
