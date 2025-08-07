import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { RoleResponse } from "@/types/response/roles";
import roleApis from "@/apis/roleApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface RoleRequest {
    role_name: string;
    permissions: number[];
}
export const roleQueryKeys = {
    all: ["role"] as const,
    lists: () => [...roleQueryKeys.all, "list"] as const,
    list: (filters: string) => [...roleQueryKeys.lists(), { filters }] as const,
    details: () => [...roleQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...roleQueryKeys.details(), id] as const,
};

export const useRoles = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...roleQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<RoleResponse>> => {
            return await roleApis.getRoles(page, pageSize, search);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateRole = (): UseMutationResult<
    BaseResponse<RoleResponse>,
    Error,
    RoleRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RoleRequest): Promise<BaseResponse<RoleResponse>> => {
            return await roleApis.createRole(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo vai trò:", error);
        },
    });
};

export const useUpdateRole = (): UseMutationResult<
    BaseResponse<RoleResponse>,
    Error,
    RoleRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: RoleRequest & { id: string }
        ): Promise<BaseResponse<RoleResponse>> => {
            return await roleApis.updateRole(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật vai trò:", error);
        },
    });
};

export const useDeleteRole = (): UseMutationResult<BaseResponse<RoleResponse>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<RoleResponse>> => {
            return await roleApis.deleteRole(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: roleQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa vai trò:", error);
        },
    });
};
