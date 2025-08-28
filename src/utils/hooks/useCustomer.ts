import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { CustomerResponse } from "@/types/response/customer";
import customerApis from "@/apis/customerApis";
import { BaseResponse } from "@/types/response/baseResponse";

export interface CustomerRequest {
    full_name: string;
    phone_number: string;
}

export const customerQueryKeys = {
    all: ["customer"] as const,
    lists: () => [...customerQueryKeys.all, "list"] as const,
    list: (filters: string) => [...customerQueryKeys.lists(), { filters }] as const,
    details: () => [...customerQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...customerQueryKeys.details(), id] as const,
};

export const useCustomers = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...customerQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<CustomerResponse>> => {
            return await customerApis.getCustomer(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateCustomer = (): UseMutationResult<
    BaseResponse<CustomerResponse>,
    Error,
    CustomerRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CustomerRequest): Promise<BaseResponse<CustomerResponse>> => {
            return await customerApis.createCustomer(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: customerQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo khách hàng:", error);
        },
    });
};

export const useUpdateCustomer = (): UseMutationResult<
    BaseResponse<CustomerResponse>,
    Error,
    CustomerRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: CustomerRequest & { id: string }
        ): Promise<BaseResponse<CustomerResponse>> => {
            return await customerApis.updateCustomer(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: customerQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật khách hàng:", error);
        },
    });
};

export const useDeleteCustomer = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await customerApis.deleteCustomer(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: customerQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa khách hàng:", error);
        },
    });
};
