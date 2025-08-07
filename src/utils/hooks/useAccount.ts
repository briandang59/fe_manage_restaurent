import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { AccountResponse } from "@/types/response/account";
import accountApis from "@/apis/accountApis";
import { BaseResponse } from "@/types/response/baseResponse";

interface AccountRequest {
    user_name: string;
    role_id: number;
}

export const accountQueryKeys = {
    all: ["account"] as const,
    lists: () => [...accountQueryKeys.all, "list"] as const,
    list: (filters: string) => [...accountQueryKeys.lists(), { filters }] as const,
    details: () => [...accountQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...accountQueryKeys.details(), id] as const,
};

export const useAccounts = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...accountQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<AccountResponse>> => {
            return await accountApis.getAccount(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateAccount = (): UseMutationResult<
    BaseResponse<AccountResponse>,
    Error,
    AccountRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AccountRequest): Promise<BaseResponse<AccountResponse>> => {
            return await accountApis.createAccount(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: accountQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo tài khoản:", error);
        },
    });
};

export const useUpdateAccount = (): UseMutationResult<
    BaseResponse<AccountResponse>,
    Error,
    AccountRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: AccountRequest & { id: string }
        ): Promise<BaseResponse<AccountResponse>> => {
            return await accountApis.updateAccount(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: accountQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật tài khoản:", error);
        },
    });
};

export const useDeleteAccount = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await accountApis.deleteAccount(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: accountQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa tài khoản:", error);
        },
    });
};
