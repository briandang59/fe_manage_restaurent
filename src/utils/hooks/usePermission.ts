import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { PermissionResponse } from "@/types/response/permission";
import permissionApis from "@/apis/permissionApis";

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
            return await permissionApis.getPermissions(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
