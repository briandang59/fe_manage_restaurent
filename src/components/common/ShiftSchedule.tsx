import { ShiftScheduleResponseType } from "@/types/response/shiftSchedule";
import { CheckTime } from "@/utils/functions/checkTime";
import { Calendar, Clock } from "lucide-react";

interface ShiftScheduleProps {
    record: ShiftScheduleResponseType;
}
function ShiftSchedule({ record }: ShiftScheduleProps) {
    return (
        <div className="relative flex items-center justify-between rounded-xl border bg-gradient-to-b from-white to-gray-50 p-5 shadow-sm transition hover:shadow-md">
            {/* Left info */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm">{record.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{record.shift?.shift_name}</h3>
            </div>

            {/* Right info */}
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-base font-medium text-blue-600">
                    {CheckTime(record.shift?.start_time)} - {CheckTime(record.shift?.end_time)}
                </span>
            </div>
        </div>
    );
}

export default ShiftSchedule;
