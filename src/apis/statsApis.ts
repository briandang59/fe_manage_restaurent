import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { BaseResponse } from "@/types/response/baseResponse";

export interface StatsResponse {
    [key: string]: any; // Flexible for different stats
}

const statsApis = {
    getRevenueStats: async (
        fromDate?: string,
        toDate?: string
    ): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/revenue`, {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getIngredientsStats: async (): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/ingredients`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getEmployeesStats: async (
        fromDate?: string,
        toDate?: string
    ): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/employees`, {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getOrdersStats: async (
        fromDate?: string,
        toDate?: string
    ): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/orders`, {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getBookingsStats: async (
        fromDate?: string,
        toDate?: string
    ): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/bookings`, {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCustomersStats: async (
        fromDate?: string,
        toDate?: string
    ): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/customers`, {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTicketsStats: async (
        fromDate?: string,
        toDate?: string
    ): Promise<BaseResponse<StatsResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/stats/tickets`, {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllSalaries: async (month: string) => {
        const res = await axiosInstance.get(`/${urls.api}/salary/all`, {
            params: { month },
        });
        return res.data;
    },
};

export default statsApis;
