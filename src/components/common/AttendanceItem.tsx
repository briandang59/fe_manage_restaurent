import { AttendanceResponse } from "@/types/response/attendance";
import { Clock, CalendarDays, Briefcase } from "lucide-react";

interface AttendanceItemProps {
    record: AttendanceResponse;
}

function AttendanceItem({ record }: AttendanceItemProps) {
    const start = new Date(record.actual_start_time).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const end = new Date(record.actual_end_time).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const date = new Date(record.shift_schedule.date).toLocaleDateString("vi-VN");

    return (
        <div className="relative flex flex-col gap-4 rounded-xl border bg-gradient-to-b from-white to-gray-50 p-6 shadow-md transition hover:shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <span className="font-medium">{date}</span>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    ID #{record.id}
                </div>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-lg font-semibold text-gray-800">
                        {start} → {end}
                    </span>
                </div>
                <div className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {record.hours} giờ
                </div>
            </div>

            {/* Shift info */}
            <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <span>Ca làm: {record.shift_schedule.shift_id}</span>
            </div>

            {/* Footer */}
            <div className="mt-2 text-xs text-gray-400">
                Cập nhật lúc{" "}
                {new Date(record.updated_at).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </div>
        </div>
    );
}

export default AttendanceItem;
