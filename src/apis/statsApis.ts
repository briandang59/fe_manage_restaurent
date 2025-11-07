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
            const response = await axiosInstance.get(`/${urls.api}/${urls.stats}/${urls.revenue}`, {
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
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.stats}/${urls.ingredients}`
            );
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
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.stats}/${urls.employees}`,
                {
                    params: {
                        from_date: fromDate,
                        to_date: toDate,
                    },
                }
            );
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
            const response = await axiosInstance.get(`/${urls.api}/${urls.stats}/${urls.orders}`, {
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
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.stats}/${urls.bookings}`,
                {
                    params: {
                        from_date: fromDate,
                        to_date: toDate,
                    },
                }
            );
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
            const response = await axiosInstance.get(
                `/${urls.api}/${urls.stats}/${urls.customers}`,
                {
                    params: {
                        from_date: fromDate,
                        to_date: toDate,
                    },
                }
            );
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
            const response = await axiosInstance.get(`/${urls.api}/${urls.stats}/${urls.tickets}`, {
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
        const res = await axiosInstance.get(`/${urls.api}/${urls.salary}/${urls.all}`, {
            params: { month },
        });
        return res.data;
    },
};

export default statsApis;
