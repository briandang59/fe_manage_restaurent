import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { TicketRequestType } from "@/types/request/ticket";
import { BaseResponse } from "@/types/response/baseResponse";

const ticketApis = {
    getTicket: async (page: number, pageSize: number): Promise<ApiResponse<any>> => {
        try {
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.tickets}?populate[ingredient]`,
                {
                    params: {
                        page,
                        page_size: pageSize,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createTicket: async (data: TicketRequestType): Promise<BaseResponse<any>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.tickets}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTicket: async (id: string, data: TicketRequestType): Promise<BaseResponse<any>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.tickets}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ticketApis;
