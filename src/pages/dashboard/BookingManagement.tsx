import { useState } from "react";
import BookingItem from "@/components/common/BookingItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, Search } from "lucide-react";
// import { format } from "date-fns";
// import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import { useBookings, useUpdateBookingStatus } from "@/utils/hooks/useBooking";
import { BookingResponse, BookingStatus } from "@/types/response/booking";
import { BookingFilterRequest } from "@/types/request/bookingManagement";
import toast from "react-hot-toast";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";

function BookingManagement() {
    const [filters, setFilters] = useState<BookingFilterRequest>({
        page: 1,
        page_size: 12,
    });
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    const { data: bookingData, isLoading, error } = useBookings(filters);
    const updateStatusMutation = useUpdateBookingStatus();

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
        setFilters((prev) => ({
            ...prev,
            date: date ? dayjs(date).format("YYYY-MM-DD") : undefined,
            page: 1,
        }));
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        setFilters((prev) => ({
            ...prev,
            status: status === "all" ? undefined : status,
            page: 1,
        }));
    };

    const handleUpdateStatus = async (id: string, status: BookingStatus, tableId?: number) => {
        try {
            await updateStatusMutation.mutateAsync({
                id,
                data: {
                    status,
                    table_id: tableId,
                },
            });
            toast.success("Cập nhật trạng thái thành công");
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi cập nhật trạng thái");
        }
    };

    const handleSearch = (searchTerm: string) => {
        // Implement search functionality if needed
        console.log("Search:", searchTerm);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    const bookings = bookingData?.data || [];
    const pagination = bookingData?.pagination;

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quản lý đặt bàn</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Date Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-[240px] justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : "Chọn ngày"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* Status Filter */}
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="pending">Chờ xác nhận</SelectItem>
                        <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                        <SelectItem value="arrived">Đã đến</SelectItem>
                        <SelectItem value="dining">Đang ăn</SelectItem>
                        <SelectItem value="completed">Đã thanh toán</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                </Select>

                {/* Search */}
                <div className="relative max-w-sm flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Tìm kiếm theo tên khách hàng..."
                        className="pl-10"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/* Clear Filters */}
                <Button
                    variant="outline"
                    onClick={() => {
                        setSelectedDate(undefined);
                        setSelectedStatus("all");
                        setFilters({ page: 1, page_size: 12 });
                    }}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Xóa bộ lọc
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-yellow-50 p-4">
                    <div className="text-2xl font-bold text-yellow-600">
                        {bookings.filter((b) => b.status === "pending").length}
                    </div>
                    <div className="text-sm text-yellow-700">Chờ xác nhận</div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                    <div className="text-2xl font-bold text-blue-600">
                        {bookings.filter((b) => b.status === "confirmed").length}
                    </div>
                    <div className="text-sm text-blue-700">Đã xác nhận</div>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                    <div className="text-2xl font-bold text-green-600">
                        {
                            bookings.filter((b) => b.status === "arrived" || b.status === "dining")
                                .length
                        }
                    </div>
                    <div className="text-sm text-green-700">Đang phục vụ</div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4">
                    <div className="text-2xl font-bold text-emerald-600">
                        {bookings.filter((b) => b.status === "completed").length}
                    </div>
                    <div className="text-sm text-emerald-700">Hoàn thành</div>
                </div>
            </div>

            {/* Bookings Grid */}
            {bookings.length === 0 ? (
                <div className="py-12 text-center">
                    <div className="text-lg text-gray-500">Không có đặt bàn nào</div>
                    <div className="mt-2 text-sm text-gray-400">
                        {selectedDate || selectedStatus !== "all"
                            ? "Thử thay đổi bộ lọc để xem kết quả khác"
                            : "Chưa có đặt bàn nào được tạo"}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking: BookingResponse) => (
                        <BookingItem
                            key={booking.id}
                            record={booking}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination && pagination.total > pagination.page_size && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={filters.page === 1}
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, page: (prev.page || 1) - 1 }))
                        }
                    >
                        Trước
                    </Button>
                    <span className="text-sm text-gray-600">
                        Trang {filters.page || 1} /{" "}
                        {Math.ceil(pagination.total / pagination.page_size)}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={
                            (filters.page || 1) >=
                            Math.ceil(pagination.total / pagination.page_size)
                        }
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))
                        }
                    >
                        Sau
                    </Button>
                </div>
            )}
        </div>
    );
}

export default BookingManagement;
