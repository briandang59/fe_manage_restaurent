import AttendanceItem from "@/components/common/AttendanceItem";
import ShiftSchedule from "@/components/common/ShiftSchedule";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTitle, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { CheckTime } from "@/utils/functions/checkTime";
import { groupByDay } from "@/utils/functions/groupByDay";
import { useAppLocalStorage } from "@/utils/hooks/useAppLocalStorage";
import {
    useAttendances,
    useCreateAttendance,
    useUpdateAttendance,
} from "@/utils/hooks/useAttendance";
import { useAuth } from "@/utils/hooks/useAuth";
import { useAvailibilities, useUpdateAvailibilities } from "@/utils/hooks/useAvailibilities";
import { useShiftSchedule } from "@/utils/hooks/useShiftSchedule";
import { User } from "lucide-react";
import toast from "react-hot-toast";

function Profile() {
    const { getUser } = useAuth();
    const user = getUser();
    const { data: availibilities } = useAvailibilities(1, 100, undefined, user.id);
    const { data: shiftSchedule } = useShiftSchedule(1, 100, 1);
    const { data: attendances } = useAttendances(1, 100);
    const { employee } = useAppLocalStorage();
    const availibilitiesData = groupByDay(availibilities?.data ?? []);
    const updateAvaibilities = useUpdateAvailibilities();
    const createAttendance = useCreateAttendance();
    const updateAttendance = useUpdateAttendance();

    // Kiểm tra ca hôm nay
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const todayShift = shiftSchedule?.data?.find((schedule) => schedule.date === today);

    // Kiểm tra xem đã chấm công hôm nay chưa
    const todayAttendance = attendances?.data?.find(
        (att) =>
            att.shift_schedule.date === today && att.shift_schedule.employee_id === employee?.id
    );

    // Trạng thái hiện tại
    const isCheckedIn = todayAttendance && todayAttendance.actual_start_time;
    const isCheckedOut =
        todayAttendance &&
        todayAttendance.actual_end_time &&
        todayAttendance.actual_end_time !== todayAttendance.actual_start_time;

    // Hàm xử lý vào ca
    const handleCheckIn = async () => {
        if (!todayShift) {
            toast.error("Hôm nay bạn không có ca làm việc!");
            return;
        }

        if (isCheckedIn) {
            toast.error("Bạn đã vào ca rồi!");
            return;
        }

        try {
            const now = new Date().toISOString();
            await createAttendance.mutateAsync({
                shift_schedule_id: todayShift.id,
                actual_start_time: now,
                actual_end_time: now, // Tạm thời set bằng start_time
            });
            toast.success("Vào ca thành công!");
        } catch (error) {
            console.error("Lỗi khi vào ca:", error);
            toast.error("Có lỗi xảy ra khi vào ca!");
        }
    };

    // Hàm xử lý ra ca
    const handleCheckOut = async () => {
        if (!todayAttendance) {
            toast.error("Bạn chưa vào ca hôm nay!");
            return;
        }

        if (isCheckedOut) {
            toast.error("Bạn đã ra ca rồi!");
            return;
        }

        try {
            const now = new Date().toISOString();
            await updateAttendance.mutateAsync({
                id: String(todayAttendance.id),
                actual_end_time: now,
            });
            toast.success("Ra ca thành công!");
        } catch (error) {
            console.error("Lỗi khi ra ca:", error);
            toast.error("Có lỗi xảy ra khi ra ca!");
        }
    };
    const handleToggle = (availibilityId: number, checked: boolean | "indeterminate") => {
        const newVal = checked === true;

        // Find the availability data to get the required fields
        const availabilityData = availibilities?.data?.find((item) => item.id === availibilityId);

        if (availabilityData) {
            updateAvaibilities.mutateAsync({
                id: String(availibilityId),
                is_available: newVal,
                employee_id: availabilityData.employee_id,
                shift_id: availabilityData.shift_id,
                day_of_week: availabilityData.day_of_week,
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border bg-gradient-to-b from-white to-gray-50 p-8 shadow-lg">
                {/* Vòng tròn nền mờ phía sau avatar */}
                <div className="absolute -top-12 h-40 w-40 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl"></div>

                {/* Avatar */}
                <div className="relative z-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-lg">
                    {employee?.avatar_file_id ? (
                        <img
                            src={`/api/files/${employee.avatar_file_id}`}
                            alt={employee.full_name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <User className="h-14 w-14 text-[#3B2010]" strokeWidth={1.5} />
                    )}
                </div>

                {/* Tên + email */}
                <div className="relative z-10 mt-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                        {employee?.full_name}
                    </h2>
                    <p className="text-gray-500">{employee?.email}</p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                {/* Info grid */}
                <div className="grid w-full grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                        <p className="text-gray-500">📞 Số điện thoại</p>
                        <p className="font-medium text-gray-800">{employee?.phone_number}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">📍 Địa chỉ</p>
                        <p className="font-medium text-gray-800">{employee?.address}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">🎂 Ngày sinh</p>
                        <p className="font-medium text-gray-800">
                            {new Date(employee?.birthday ?? "").toLocaleDateString("vi-VN")}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">📅 Ngày vào làm</p>
                        <p className="font-medium text-gray-800">
                            {new Date(employee?.join_date ?? "").toLocaleDateString("vi-VN")}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">💼 Loại hợp đồng</p>
                        <p className="font-medium text-gray-800">{employee?.schedule_type}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">💰 Lương cơ bản</p>
                        <p className="font-medium text-green-600">
                            {employee?.base_salary?.toLocaleString("vi-VN")} đ
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">⏰ Lương theo giờ</p>
                        <p className="font-medium text-green-600">
                            {employee?.salary_per_hour?.toLocaleString("vi-VN")} đ
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">👤 Giới tính</p>
                        <p className="font-medium text-gray-800">
                            {employee?.gender ? "Nam" : "Nữ"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex min-h-[500px] flex-col gap-4 rounded-[10px] border p-4 shadow-md">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-[20px] font-semibold">Thông tin chấm công</h3>
                        <div className="flex gap-2">
                            {todayShift ? (
                                <>
                                    {!isCheckedIn ? (
                                        <Button
                                            onClick={handleCheckIn}
                                            disabled={createAttendance.isPending}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            {createAttendance.isPending
                                                ? "Đang xử lý..."
                                                : "Vào ca"}
                                        </Button>
                                    ) : !isCheckedOut ? (
                                        <Button
                                            onClick={handleCheckOut}
                                            disabled={updateAttendance.isPending}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            {updateAttendance.isPending ? "Đang xử lý..." : "Ra ca"}
                                        </Button>
                                    ) : (
                                        <Button disabled className="bg-gray-400">
                                            Đã hoàn thành ca
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <Button disabled className="bg-gray-400">
                                    Không có ca hôm nay
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Thông tin ca hôm nay */}
                    {todayShift && (
                        <div className="rounded-lg bg-blue-50 p-4">
                            <h4 className="mb-2 font-semibold text-blue-800">Ca hôm nay:</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Ca làm:</span>
                                    <span className="ml-2 font-medium">
                                        {todayShift.shift.shift_name}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Thời gian:</span>
                                    <span className="ml-2 font-medium">
                                        {CheckTime(todayShift.shift.start_time)} -{" "}
                                        {CheckTime(todayShift.shift.end_time)}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Trạng thái:</span>
                                    <span
                                        className={`ml-2 font-medium ${
                                            isCheckedOut
                                                ? "text-green-600"
                                                : isCheckedIn
                                                  ? "text-yellow-600"
                                                  : "text-gray-600"
                                        }`}
                                    >
                                        {isCheckedOut
                                            ? "Đã hoàn thành"
                                            : isCheckedIn
                                              ? "Đang làm việc"
                                              : "Chưa vào ca"}
                                    </span>
                                </div>
                                {isCheckedIn && (
                                    <div>
                                        <span className="text-gray-600">Vào ca lúc:</span>
                                        <span className="ml-2 font-medium">
                                            {new Date(
                                                todayAttendance.actual_start_time
                                            ).toLocaleTimeString("vi-VN")}
                                        </span>
                                    </div>
                                )}
                                {isCheckedOut && (
                                    <div>
                                        <span className="text-gray-600">Ra ca lúc:</span>
                                        <span className="ml-2 font-medium">
                                            {new Date(
                                                todayAttendance.actual_end_time
                                            ).toLocaleTimeString("vi-VN")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4">
                        {attendances?.data.map((att, index) => (
                            <AttendanceItem record={att} key={index} />
                        ))}
                    </div>
                </div>
                <div className="flex min-h-[500px] flex-col gap-4 rounded-[10px] border p-4 shadow-md">
                    <Sheet>
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-[20px] font-semibold">Ca làm</h3>
                            <SheetTrigger>
                                <Button>Đăng ký ca làm</Button>
                            </SheetTrigger>
                        </div>
                        <div className="mt-2 max-h-[500px] space-y-2 overflow-y-auto">
                            {shiftSchedule?.data.map((shiftSchedule, index) => (
                                <ShiftSchedule record={shiftSchedule} key={index} />
                            ))}
                        </div>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Đăng ký ca làm</SheetTitle>
                            </SheetHeader>

                            {/* Chọn tất cả / Bỏ chọn tất cả */}
                            <div className="mt-4 flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        availibilitiesData.forEach((avai) =>
                                            avai.shifts.forEach((shift) => {
                                                if (!shift.is_available) {
                                                    handleToggle(shift.availibility_id, true);
                                                }
                                            })
                                        );
                                    }}
                                >
                                    Chọn tất cả
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => {
                                        availibilitiesData.forEach((avai) =>
                                            avai.shifts.forEach((shift) => {
                                                if (shift.is_available) {
                                                    handleToggle(shift.availibility_id, false);
                                                }
                                            })
                                        );
                                    }}
                                >
                                    Bỏ chọn tất cả
                                </Button>
                            </div>

                            <div className="mt-8 max-h-[800px] overflow-y-auto">
                                {availibilitiesData.map((avai) => (
                                    <div key={avai.name_date} className="mb-4 flex flex-col gap-4">
                                        <h4 className="font-semibold">{avai.name_date}</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            {avai.shifts.map((shift) => (
                                                <div
                                                    key={shift.availibility_id}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Checkbox
                                                        id={`${avai.name_date}-${shift.shift.id}`}
                                                        checked={shift.is_available}
                                                        onCheckedChange={(checked) => {
                                                            handleToggle(
                                                                shift.availibility_id,
                                                                checked
                                                            );
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`${avai.name_date}-${shift.shift.id}`}
                                                        className="text-sm font-medium leading-none"
                                                    >
                                                        {shift.shift.shift_name} (
                                                        {CheckTime(shift.shift.start_time)} →{" "}
                                                        {CheckTime(shift.shift.end_time)})
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}

export default Profile;
