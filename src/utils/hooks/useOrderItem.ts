import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { OrderItemResponse } from "@/types/response/orderItem";
import { BaseResponse } from "@/types/response/baseResponse";
import orderItemApis from "@/apis/orderItemApis";
import { OrderItemRequestType } from "@/types/request/order";

// 🔑 Query keys
export const orderItemQueryKeys = {
    all: ["orderItem"] as const,
    lists: () => [...orderItemQueryKeys.all, "list"] as const,
    list: (filters: string) => [...orderItemQueryKeys.lists(), { filters }] as const,
    details: () => [...orderItemQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...orderItemQueryKeys.details(), id] as const,
};

// 🟢 Lấy danh sách order items (phân trang)
export const useOrderItems = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...orderItemQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<OrderItemResponse>> => {
            return await orderItemApis.getOrderItem(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// 🟢 Lấy chi tiết order item theo itemId
export const useOrderItemById = (id: string) => {
    return useQuery({
        queryKey: orderItemQueryKeys.detail(id),
        queryFn: async (): Promise<BaseResponse<OrderItemResponse[]>> => {
            return await orderItemApis.getOrderItemById(id);
        },
        enabled: !!id,
    });
};

// 🟢 Lấy danh sách order items theo orderId
export const useOrderItemsByOrderId = (orderId: string, options?: any) => {
    return useQuery<BaseResponse<OrderItemResponse[]>>({
        queryKey: ["orderItemsByOrderId", orderId],
        queryFn: async () => {
            return await orderItemApis.getOrderItemByOrderId(orderId);
        },
        enabled: !!orderId,
        ...options,
    });
};

// 🟢 Tạo order item
export const useCreateOrderItem = (): UseMutationResult<
    BaseResponse<OrderItemResponse>,
    Error,
    OrderItemRequestType
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            data: OrderItemRequestType
        ): Promise<BaseResponse<OrderItemResponse>> => {
            return await orderItemApis.createOrderItem(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderItemQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo orderItem:", error);
        },
    });
};

// 🟢 Cập nhật order item
export const useUpdateOrderItem = (): UseMutationResult<
    BaseResponse<OrderItemResponse>,
    Error,
    OrderItemRequestType & { id: string }
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            data: OrderItemRequestType & { id: string }
        ): Promise<BaseResponse<OrderItemResponse>> => {
            return await orderItemApis.updateOrderItem(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderItemQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật orderItem:", error);
        },
    });
};

// 🟢 Xoá order item
export const useDeleteOrderItem = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string): Promise<BaseResponse<void>> => {
            return await orderItemApis.deleteOrderItem(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderItemQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa orderItem:", error);
        },
    });
};
