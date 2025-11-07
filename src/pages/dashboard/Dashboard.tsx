import StatsCard from "@/components/common/StatsCard";
import {
    useBookingsStats,
    useCustomersStats,
    useEmployeesStats,
    useIngredientsStats,
    useOrdersStats,
    useRevenueStats,
    useTicketsStats,
    useAllSalaries,
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

// Inline types (no import needed)
interface MenuItemWithImage {
    menu_item_id: number;
    name: string;
    description: string;
    price: number;
    total_qty: number;
    file_id: number;
    file_name: string;
    url: string;
    mime_type: string;
}

interface EmployeeStat {
    id: number;
    full_name: string;
    gender: boolean;
    birthday: string;
    phone_number: string;
    email: string;
    schedule_type: string;
    address: string;
    join_date: string;
    base_salary: number;
    salary_per_hour: number;
    avatar_file_id: number | null;
    total_hours: number;
    salary: number;
}

const Dashboard = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const fromDateStr = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : undefined;
    const toDateStr = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

    // Lấy tháng từ startDate (fromDate) cho salaries
    const selectedMonth = fromDateStr
        ? format(new Date(fromDateStr), "yyyy-MM")
        : format(new Date(), "yyyy-MM");

    // Fetch stats (giữ nguyên)
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
    const { isLoading: salariesLoading } = useAllSalaries(selectedMonth);

    // Extract data để hiển thị hết
    const topSellingItems: MenuItemWithImage[] = ordersData?.data?.top_items || [];
    const employeeStats: EmployeeStat[] = employeesData?.data?.employee_stats || [];
    const ordersLoadingCombined = ordersLoading || revenueLoading;
    const employeesLoadingCombined = employeesLoading || salariesLoading;

    return (
        <div className="space-y-6 rounded-lg bg-gray-50 p-6">
            {/* Header (bỏ Select tháng) */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            // Fix: Use className for outline style instead of variant to avoid TS error
                            className="w-[260px] justify-start border border-input px-3 py-2 text-left font-normal shadow-sm"
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
                                <span>Chọn ngày</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Stats Cards Grid (hiển thị 8 cards, responsive) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Doanh thu"
                    icon={<DollarSign className="h-5 w-5 text-green-600" />}
                    isLoading={revenueLoading}
                >
                    <p className="text-2xl font-bold text-green-600">
                        {formatNumberWithCommas(revenueData?.data?.total_revenue || 0)} VND
                    </p>
                    <p className="text-sm text-gray-500">Tăng trưởng: +12.5%</p>
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

                <StatsCard
                    title="Tổng lương nhân viên"
                    icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
                    isLoading={employeesLoading}
                >
                    {employeesData?.data?.employee_stats?.length ? (
                        <>
                            <p className="text-2xl font-bold text-emerald-600">
                                {formatNumberWithCommas(
                                    employeesData.data.employee_stats.reduce(
                                        (sum: number, e: any) => sum + e.salary,
                                        0
                                    )
                                )}{" "}
                                VND
                            </p>
                            <p className="text-sm text-gray-500">
                                Số nhân viên:{" "}
                                <span className="font-medium">
                                    {employeesData.data.employee_stats.length}
                                </span>
                            </p>
                        </>
                    ) : (
                        <p className="text-sm text-gray-400">Chưa có dữ liệu</p>
                    )}
                </StatsCard>
            </div>

            {/* Inline Top Selling Items Table (hiển thị hết, no import) */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Top Món Bán Chạy</h3>
                {ordersLoadingCombined ? (
                    <p className="text-gray-500">Đang tải...</p>
                ) : topSellingItems.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Tên Món
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Giá
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Số Lượng Bán
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {topSellingItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {item.url && (
                                                    <img
                                                        src={item.url}
                                                        alt={item.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded object-cover"
                                                    />
                                                )}
                                                <span>{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span>{formatNumberWithCommas(item.price)} VND</span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span>{item.total_qty}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Chưa có dữ liệu</p>
                )}
            </div>

            {/* Inline Employee Performance Table (hiển thị hết, no import) */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Hiệu Suất Nhân Viên</h3>
                {employeesLoadingCombined ? (
                    <p className="text-gray-500">Đang tải...</p>
                ) : employeeStats.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Tên Nhân Viên
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Tổng Giờ Làm
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Lương
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {employeeStats.map((stat, idx) => (
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span>{stat.full_name}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span>{stat.total_hours} giờ</span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span>{formatNumberWithCommas(stat.salary)} VND</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Chưa có dữ liệu</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
