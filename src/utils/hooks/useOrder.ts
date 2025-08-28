import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { OrderResponse } from "@/types/response/order";
import orderApis from "@/apis/orderApis";
import { BaseResponse } from "@/types/response/baseResponse";

export interface OrderRequest {
    table_id: number;
    status?: string;
}

export const orderQueryKeys = {
    all: ["order"] as const,
    lists: () => [...orderQueryKeys.all, "list"] as const,
    list: (filters: string) => [...orderQueryKeys.lists(), { filters }] as const,
    details: () => [...orderQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...orderQueryKeys.details(), id] as const,
};

export const useOrders = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...orderQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<OrderResponse>> => {
            return await orderApis.getOrder(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateOrder = (): UseMutationResult<
    BaseResponse<OrderResponse>,
    Error,
    OrderRequest
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: OrderRequest): Promise<BaseResponse<OrderResponse>> => {
            return await orderApis.createOrder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo đơn hàng:", error);
        },
    });
};

export const useUpdateOrder = (): UseMutationResult<
    BaseResponse<OrderResponse>,
    Error,
    OrderRequest & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: OrderRequest & { id: string }
        ): Promise<BaseResponse<OrderResponse>> => {
            return await orderApis.updateOrder(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
        },
    });
};

export const useDeleteOrder = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await orderApis.deleteOrder(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa đơn hàng:", error);
        },
    });
};

export const useOrderByTableId = (tableId?: string) => {
    return useQuery({
        queryKey: orderQueryKeys.detail(`table-${tableId}`),
        queryFn: async (): Promise<BaseResponse<OrderResponse>> => {
            if (!tableId) throw new Error("tableId is required");
            return await orderApis.getOrderByTableId(tableId);
        },
        enabled: !!tableId, // chỉ gọi khi có tableId
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
