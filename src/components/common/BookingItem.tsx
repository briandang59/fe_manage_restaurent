import { BookingResponse, BookingStatus } from "@/types/response/booking";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Phone, Mail, MapPin } from "lucide-react";
import dayjs from "dayjs";
import { CheckTime } from "@/utils/functions/checkTime";

interface BookingItemProps {
    record: BookingResponse;
    onUpdateStatus: (id: string, status: BookingStatus, tableId?: number) => Promise<void>;
}

const statusConfig = {
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
    arrived: { label: "Đã đến", color: "bg-green-100 text-green-800" },
    dining: { label: "Đang ăn", color: "bg-purple-100 text-purple-800" },
    completed: { label: "Đã thanh toán", color: "bg-emerald-100 text-emerald-800" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
};

function BookingItem({ record, onUpdateStatus }: BookingItemProps) {
    const statusInfo = statusConfig[record.status] || statusConfig.pending;

    const handleStatusUpdate = async (newStatus: BookingStatus) => {
        await onUpdateStatus(record.id.toString(), newStatus, record.table_id);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="cursor-pointer rounded-lg border border-gray-200 p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">{record.customer_name}</h3>
                            <p className="text-sm text-gray-600">#{record.id}</p>
                        </div>
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.color}`}
                        >
                            {statusInfo.label}
                        </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{dayjs(record.booking_date).format("DD/MM/YYYY")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{record.booking_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{record.total_persons} người</span>
                        </div>
                        {record.table && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Bàn {record.table.table_name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </SheetTrigger>

            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Chi tiết đặt bàn #{record.id}</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Thông tin khách hàng */}
                    <div>
                        <h3 className="mb-3 font-semibold text-gray-900">Thông tin khách hàng</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Tên:</span>
                                <span>{record.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{record.phone_number}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{record.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Thông tin đặt bàn */}
                    <div>
                        <h3 className="mb-3 font-semibold text-gray-900">Thông tin đặt bàn</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{dayjs(record.booking_date).format("DD/MM/YYYY")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{CheckTime(record.booking_time)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{record.total_persons} người</span>
                            </div>
                            {record.table && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>
                                        Bàn {record.table.table_name} - {record.table.position}
                                    </span>
                                </div>
                            )}
                            {record.memo && (
                                <div>
                                    <span className="font-medium">Ghi chú:</span>
                                    <p className="mt-1 text-gray-600">{record.memo}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cập nhật trạng thái */}
                    <div>
                        <h3 className="mb-3 font-semibold text-gray-900">Cập nhật trạng thái</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(statusConfig).map(([status, config]) => (
                                <Button
                                    key={status}
                                    variant={record.status === status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleStatusUpdate(status as BookingStatus)}
                                    disabled={record.status === status}
                                    className="text-xs"
                                >
                                    {config.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default BookingItem;
