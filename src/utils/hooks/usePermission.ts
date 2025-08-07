import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { PermissionResponse } from "@/types/response/permission";
import permissionApis from "@/apis/permissionApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface PermissionRequest {
    permission_name: string;
}

export const permissionQueryKeys = {
    all: ["permission"] as const,
    lists: () => [...permissionQueryKeys.all, "list"] as const,
    list: (filters: string) => [...permissionQueryKeys.lists(), { filters }] as const,
    details: () => [...permissionQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...permissionQueryKeys.details(), id] as const,
};

export const usePermissions = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...permissionQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<PermissionResponse>> => {
            return await permissionApis.getPermissions(page, pageSize, search);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreatePermission = (): UseMutationResult<
    BaseResponse<PermissionResponse>,
    Error,
    PermissionRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: PermissionRequest): Promise<BaseResponse<PermissionResponse>> => {
            return await permissionApis.createPermission(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: permissionQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo quyền:", error);
        },
    });
};

export const useUpdatePermission = (): UseMutationResult<
    BaseResponse<PermissionResponse>,
    Error,
    PermissionRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: PermissionRequest & { id: string }
        ): Promise<BaseResponse<PermissionResponse>> => {
            return await permissionApis.updatePermission(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: permissionQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật quyền:", error);
        },
    });
};

export const useDeletePermission = (): UseMutationResult<
    BaseResponse<PermissionResponse>,
    Error,
    string
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<PermissionResponse>> => {
            return await permissionApis.deletePermission(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: permissionQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa quyền:", error);
        },
    });
};
