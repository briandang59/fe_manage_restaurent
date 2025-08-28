import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";

import { BaseResponse } from "@/types/response/baseResponse";
import { BookingRequestType } from "@/types/request/booking";
import bookingApis from "@/apis/bookingApis";

export const bookingQueryKeys = {
    all: ["customer"] as const,
    lists: () => [...bookingQueryKeys.all, "list"] as const,
    list: (filters: string) => [...bookingQueryKeys.lists(), { filters }] as const,
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
