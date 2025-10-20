// Định nghĩa các kiểu dữ liệu cơ bản
export type Shift = {
    id: number;
    shift_name: string;
    code: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
};

// Kiểu dữ liệu nhận được trực tiếp từ API (shifts là tùy chọn)
export type AvailibilitiesResponse = {
    id: number;
    employee_id: number;
    shift_id: number;
    day_of_week: string;
    is_available: boolean;
    shifts?: Shift; // Tùy chọn, chỉ có khi được preload
    created_at: string;
    updated_at: string;
};

// 🚨 Kiểu dữ liệu yêu cầu cho hàm groupByDay: Đảm bảo shifts tồn tại
// Chỉ sử dụng cho dữ liệu đã được lọc/kiểm tra trước đó
type PreloadedSchedule = {
    id: number; // Availibility.Id
    employee_id: number;
    shift_id: number;
    day_of_week: string;
    is_available: boolean;
    shifts: Shift; // BẮT BUỘC phải có để xử lý
    created_at: string;
    updated_at: string;
};

type ShiftWithAvailibility = {
    availibility_id: number; // giữ lại Availibility.Id
    is_available: boolean;
    shift: Shift;
};

type GroupedResult = {
    name_date: string;
    shifts: ShiftWithAvailibility[];
};

const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * Nhóm dữ liệu Availibility đã được preload theo ngày trong tuần và sắp xếp.
 * * @param data Mảng các Availibility đã được đảm bảo có thuộc tính 'shifts' (PreloadedSchedule[]).
 * @returns Mảng các đối tượng GroupedResult, được sắp xếp theo thứ tự các ngày trong tuần.
 */
export function groupByDay(data: PreloadedSchedule[]): GroupedResult[] {
    const map = new Map<string, ShiftWithAvailibility[]>();

    for (const item of data) {
        if (!map.has(item.day_of_week)) {
            map.set(item.day_of_week, []);
        }
        const existing = map.get(item.day_of_week)!;

        // 🚨 THAY ĐỔI TẠI ĐÂY: Kiểm tra nếu SHIFT_ID đã tồn tại cho ngày này
        if (!existing.some((s) => s.shift.id === item.shift_id)) {
            existing.push({
                availibility_id: item.id,
                is_available: item.is_available,
                shift: item.shifts,
            });
        }
    }

    return Array.from(map.entries())
        .map(([day, shifts]) => ({
            name_date: day,
            // 3. Sắp xếp các ca trong ngày theo Shift ID (Ca 1 -> Ca 2)
            shifts: shifts.sort((a, b) => a.shift.id - b.shift.id),
        }))
        .sort(
            // 4. Sắp xếp các nhóm theo thứ tự ngày trong tuần (Thứ Hai -> Chủ Nhật)
            (a, b) => daysOrder.indexOf(a.name_date) - daysOrder.indexOf(b.name_date)
        );
}
