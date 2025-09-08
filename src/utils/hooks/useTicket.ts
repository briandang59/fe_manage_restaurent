import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/response/pagination";
import { BaseResponse } from "@/types/response/baseResponse";
import { TicketRequestType } from "@/types/request/ticket";
import ticketApis from "@/apis/ticketApis";
import { TicketResponseType } from "@/types/response/ticket";

export const ticketQueryKeys = {
    all: ["ticket"] as const,
    lists: () => [...ticketQueryKeys.all, "list"] as const,
    list: (filters: string) => [...ticketQueryKeys.lists(), { filters }] as const,
    details: () => [...ticketQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...ticketQueryKeys.details(), id] as const,
};

export const useTickets = (page: number, pageSize: number, search?: string) => {
    return useQuery({
        queryKey: [...ticketQueryKeys.lists(), page, pageSize, search],
        queryFn: async (): Promise<ApiResponse<any>> => {
            return await ticketApis.getTicket(page, pageSize);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCreateTicket = (): UseMutationResult<
    BaseResponse<any>,
    Error,
    TicketRequestType
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TicketRequestType): Promise<BaseResponse<any>> => {
            return await ticketApis.createTicket(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ticketQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi tạo bàn:", error);
        },
    });
};

export const useUpdateTicket = (): UseMutationResult<
    BaseResponse<TicketResponseType>,
    Error,
    TicketRequestType & { id: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: TicketRequestType & { id: string }
        ): Promise<BaseResponse<TicketResponseType>> => {
            return await ticketApis.updateTicket(data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ticketQueryKeys.lists() });
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật bàn:", error);
        },
    });
};
