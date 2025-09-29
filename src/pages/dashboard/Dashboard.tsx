import StatsCard from "@/components/common/StatsCard";
import { useAuth } from "@/utils/hooks/useAuth";
import {
    useBookingsStats,
    useCustomersStats,
    useEmployeesStats,
    useIngredientsStats,
    useOrdersStats,
    useRevenueStats,
    useTicketsStats,
} from "@/utils/hooks/useStats";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    CalendarIcon,
    DollarSign,
    Package,
    Users,
    ShoppingCart,
    ClipboardList,
} from "lucide-react";
import { format } from "date-fns";
import { formatNumberWithCommas } from "@/utils/functions/formatNumberWithCommas";

const Dashboard = () => {
    const { getUser, getRole } = useAuth();
    const user = getUser();
    const role = getRole();

    // Date range state
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    // Convert to yyyy-MM-dd string
    const fromDateStr = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : undefined;
    const toDateStr = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

    // Fetch stats
    const { data: revenueData, isLoading: revenueLoading } = useRevenueStats(
        fromDateStr,
        toDateStr
    );
    const { data: ingredientsData, isLoading: ingredientsLoading } = useIngredientsStats();
    const { data: employeesData, isLoading: employeesLoading } = useEmployeesStats(
        fromDateStr,
        toDateStr
    );
    const { data: ordersData, isLoading: ordersLoading } = useOrdersStats(fromDateStr, toDateStr);
    const { data: bookingsData, isLoading: bookingsLoading } = useBookingsStats(
        fromDateStr,
        toDateStr
    );
    const { data: customersData, isLoading: customersLoading } = useCustomersStats(
        fromDateStr,
        toDateStr
    );
    const { data: ticketsData, isLoading: ticketsLoading } = useTicketsStats(
        fromDateStr,
        toDateStr
    );

    return (
        <div className="space-y-6 rounded-lg bg-gray-50 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-[260px] justify-start text-left font-normal shadow-sm"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "dd/MM/yyyy")} –{" "}
                                        {format(dateRange.to, "dd/MM/yyyy")}
                                    </>
                                ) : (
                                    format(dateRange.from, "dd/MM/yyyy")
                                )
                            ) : (
                                <span>Chọn khoảng ngày</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <StatsCard
                    title="Doanh thu"
                    icon={<DollarSign className="h-5 w-5 text-green-600" />}
                    isLoading={revenueLoading}
                >
                    <p className="text-2xl font-bold text-green-600">
                        {formatNumberWithCommas(revenueData?.data?.total_revenue) || 0} VND
                    </p>
                    <p className="text-sm text-gray-500">
                        Số đơn hàng:{" "}
                        <span className="font-medium">{revenueData?.data?.order_count || 0}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        Trung bình đơn:{" "}
                        <span className="font-medium">
                            {formatNumberWithCommas(revenueData?.data?.avg_order) || 0} VND
                        </span>
                    </p>
                </StatsCard>

                <StatsCard
                    title="Nguyên liệu"
                    icon={<Package className="h-5 w-5 text-blue-600" />}
                    isLoading={ingredientsLoading}
                >
                    <p className="text-2xl font-bold text-blue-600">
                        {ingredientsData?.data?.total_ingredients || 0}
                    </p>
                    <p className="text-sm text-gray-500">
                        Sắp hết:{" "}
                        <span className="font-medium text-red-500">
                            {ingredientsData?.data?.low_stock?.length || 0}
                        </span>
                    </p>
                </StatsCard>

                <StatsCard
                    title="Nhân viên"
                    icon={<Users className="h-5 w-5 text-purple-600" />}
                    isLoading={employeesLoading}
                >
                    <p className="text-2xl font-bold text-purple-600">
                        {employeesData?.data?.total_hours || 0}
                    </p>
                    <p className="text-sm text-gray-500">Tổng giờ làm</p>
                </StatsCard>

                <StatsCard
                    title="Đơn hàng"
                    icon={<ShoppingCart className="h-5 w-5 text-orange-500" />}
                    isLoading={ordersLoading}
                >
                    <p className="text-2xl font-bold text-orange-500">
                        {ordersData?.data?.total_orders || 0}
                    </p>
                    <p className="text-sm text-gray-500">
                        Món bán chạy:{" "}
                        <span className="font-medium">
                            {ordersData?.data?.top_items?.length || 0}
                        </span>
                    </p>
                </StatsCard>

                <StatsCard
                    title="Đặt chỗ"
                    icon={<ClipboardList className="h-5 w-5 text-indigo-500" />}
                    isLoading={bookingsLoading}
                >
                    <p className="text-2xl font-bold text-indigo-500">
                        {bookingsData?.data?.total_bookings || 0}
                    </p>
                    <p className="text-sm text-gray-500">
                        Tổng khách:{" "}
                        <span className="font-medium">
                            {bookingsData?.data?.total_persons || 0}
                        </span>
                    </p>
                </StatsCard>

                <StatsCard
                    title="Khách hàng"
                    icon={<Users className="h-5 w-5 text-teal-600" />}
                    isLoading={customersLoading}
                >
                    <p className="text-2xl font-bold text-teal-600">
                        {customersData?.data?.total_customers || 0}
                    </p>
                </StatsCard>

                <StatsCard
                    title="Phiếu nguyên liệu"
                    icon={<ClipboardList className="h-5 w-5 text-pink-600" />}
                    isLoading={ticketsLoading}
                >
                    <p className="text-2xl font-bold text-pink-600">
                        {ticketsData?.data?.total_tickets || 0}
                    </p>
                </StatsCard>
            </div>
        </div>
    );
};

export default Dashboard;
