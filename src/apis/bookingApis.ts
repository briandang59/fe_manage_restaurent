import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/common/urls";
import { ApiResponse } from "@/types/response/pagination";
import { BookingRequestType } from "@/types/request/booking";

const bookingApis = {
    createBooking: async (data: BookingRequestType): Promise<ApiResponse<any>> => {
        try {
            const response = await axiosInstance.post(`/${urls.api}/${urls.bookings}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default bookingApis;
