import { useQuery } from "@tanstack/react-query";
import statsApis from "@/apis/statsApis"; // Import từ apis/statsApis.ts
import { BaseResponse } from "@/types/response/baseResponse";

export interface StatsResponse {
    [key: string]: any; // Flexible for different stats
}

export const statsQueryKeys = {
    all: ["stats"] as const,
    revenue: (fromDate?: string, toDate?: string) =>
        [...statsQueryKeys.all, "revenue", fromDate, toDate] as const,
    ingredients: () => [...statsQueryKeys.all, "ingredients"] as const,
    employees: (fromDate?: string, toDate?: string) =>
        [...statsQueryKeys.all, "employees", fromDate, toDate] as const,
    orders: (fromDate?: string, toDate?: string) =>
        [...statsQueryKeys.all, "orders", fromDate, toDate] as const,
    bookings: (fromDate?: string, toDate?: string) =>
        [...statsQueryKeys.all, "bookings", fromDate, toDate] as const,
    customers: (fromDate?: string, toDate?: string) =>
        [...statsQueryKeys.all, "customers", fromDate, toDate] as const,
    tickets: (fromDate?: string, toDate?: string) =>
        [...statsQueryKeys.all, "tickets", fromDate, toDate] as const,
};

export const useRevenueStats = (fromDate?: string, toDate?: string) => {
    return useQuery({
        queryKey: statsQueryKeys.revenue(fromDate, toDate),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getRevenueStats(fromDate, toDate);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useIngredientsStats = () => {
    return useQuery({
        queryKey: statsQueryKeys.ingredients(),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getIngredientsStats();
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useEmployeesStats = (fromDate?: string, toDate?: string) => {
    return useQuery({
        queryKey: statsQueryKeys.employees(fromDate, toDate),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getEmployeesStats(fromDate, toDate);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useOrdersStats = (fromDate?: string, toDate?: string) => {
    return useQuery({
        queryKey: statsQueryKeys.orders(fromDate, toDate),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getOrdersStats(fromDate, toDate);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useBookingsStats = (fromDate?: string, toDate?: string) => {
    return useQuery({
        queryKey: statsQueryKeys.bookings(fromDate, toDate),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getBookingsStats(fromDate, toDate);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useCustomersStats = (fromDate?: string, toDate?: string) => {
    return useQuery({
        queryKey: statsQueryKeys.customers(fromDate, toDate),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getCustomersStats(fromDate, toDate);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useTicketsStats = (fromDate?: string, toDate?: string) => {
    return useQuery({
        queryKey: statsQueryKeys.tickets(fromDate, toDate),
        queryFn: async (): Promise<BaseResponse<StatsResponse>> => {
            return await statsApis.getTicketsStats(fromDate, toDate);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useAllSalaries = (month?: string) => {
    return useQuery({
        queryKey: ["salaries", month],
        queryFn: async (): Promise<BaseResponse<any[]>> => {
            if (!month) return { data: [] } as unknown as BaseResponse<any[]>;
            return await statsApis.getAllSalaries(month);
        },
        enabled: !!month,
        staleTime: 5 * 60 * 1000,
    });
};
