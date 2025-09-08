import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { BookingRequestType } from "@/types/request/booking";
import { BookingResponse } from "@/types/response/booking";
import { BookingUpdateRequest, BookingFilterRequest } from "@/types/request/bookingManagement";
import { BaseResponse } from "@/types/response/baseResponse";

const bookingApis = {
    createBooking: async (data: BookingRequestType): Promise<ApiResponse<any>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.bookings}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getBookings: async (
        filters: BookingFilterRequest = {}
    ): Promise<ApiResponse<BookingResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.bookings}`, {
                params: {
                    page: filters.page || 1,
                    page_size: filters.page_size || 10,
                    date: filters.date,
                    status: filters.status,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getBookingById: async (id: string): Promise<BaseResponse<BookingResponse>> => {
        try {
            const response = await axiosInstance.get(`/${urls.api}/${urls.bookings}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBookingStatus: async (
        id: string,
        data: BookingUpdateRequest
    ): Promise<BaseResponse<BookingResponse>> => {
        try {
            const response = await axiosInstance.patch(`/${urls.api}/${urls.bookings}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteBooking: async (id: string): Promise<BaseResponse<void>> => {
        try {
            const response = await axiosInstance.delete(`/${urls.api}/${urls.bookings}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default bookingApis;
