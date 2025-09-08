import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
} from "@tanstack/react-query";

import { BaseResponse } from "@/types/response/baseResponse";
import { BookingRequestType } from "@/types/request/booking";
import { BookingResponse } from "@/types/response/booking";
import { BookingUpdateRequest, BookingFilterRequest } from "@/types/request/bookingManagement";
import { ApiResponse } from "@/types/response/pagination";
import bookingApis from "@/apis/bookingApis";

export const bookingQueryKeys = {
    all: ["bookings"] as const,
    lists: () => [...bookingQueryKeys.all, "list"] as const,
    list: (filters: BookingFilterRequest) => [...bookingQueryKeys.lists(), { filters }] as const,
    details: () => [...bookingQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...bookingQueryKeys.details(), id] as const,
};

export const useCreateBooking = (): UseMutationResult<
    BaseResponse<any>,
    Error,
    BookingRequestType
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BookingRequestType): Promise<BaseResponse<any>> => {
            return await bookingApis.createBooking(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bookingQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo đặt lịch:", error);
        },
    });
};

export const useBookings = (
    filters: BookingFilterRequest = {}
): UseQueryResult<ApiResponse<BookingResponse>, Error> => {
    return useQuery({
        queryKey: bookingQueryKeys.list(filters),
        queryFn: () => bookingApis.getBookings(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useBookingById = (
    id: string
): UseQueryResult<BaseResponse<BookingResponse>, Error> => {
    return useQuery({
        queryKey: bookingQueryKeys.detail(id),
        queryFn: () => bookingApis.getBookingById(id),
        enabled: !!id,
    });
};

export const useUpdateBookingStatus = (): UseMutationResult<
    BaseResponse<BookingResponse>,
    Error,
    { id: string; data: BookingUpdateRequest }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: BookingUpdateRequest }) => {
            return await bookingApis.updateBookingStatus(id, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: bookingQueryKeys.lists() });
            queryClient.invalidateQueries({ queryKey: bookingQueryKeys.detail(variables.id) });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật trạng thái đặt bàn:", error);
        },
    });
};

export const useDeleteBooking = (): UseMutationResult<BaseResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return await bookingApis.deleteBooking(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: bookingQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi xóa đặt bàn:", error);
        },
    });
};
