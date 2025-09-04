import { ShiftScheduleResponseType } from "@/types/response/shiftSchedule";
import { CheckTime } from "@/utils/functions/checkTime";

interface ShiftScheduleProps {
    record: ShiftScheduleResponseType;
}
function ShiftSchedule({ record }: ShiftScheduleProps) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-[10px] border p-4 shadow-sm">
            <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-semibold">{record?.shift?.shift_name}</h3>
                <p className="text-[14px] text-gray-500">{record?.date}</p>
            </div>
            <p className="text-[20px] font-medium text-blue-500">
                {CheckTime(record?.shift?.start_time)} - {CheckTime(record?.shift?.end_time)}
            </p>
        </div>
    );
}

export default ShiftSchedule;
