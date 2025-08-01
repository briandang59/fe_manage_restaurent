import { useQuery } from "@tanstack/react-query";      
import { ApiResponse } from "@/types/response/pagination";
import { RoleResponse } from "@/types/response/roles";
import roleApis from "@/apis/roleApis";

export const roleQueryKeys = {
  all: ["role"] as const,
  lists: () => [...roleQueryKeys.all, "list"] as const,
  list: (filters: string) => [...roleQueryKeys.lists(), { filters }] as const,
  details: () => [...roleQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...roleQueryKeys.details(), id] as const,
};

export const useRoles = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: [...roleQueryKeys.lists(), page, pageSize],
    queryFn: async (): Promise<ApiResponse<RoleResponse>> => {
      return await roleApis.getRoles(page, pageSize);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

