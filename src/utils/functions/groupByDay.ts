type Shift = {
    id: number;
    shift_name: string;
    code: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
};

type Schedule = {
    id: number; // đây chính là Availibility.Id
    employee_id: number;
    shift_id: number;
    day_of_week: string;
    is_available: boolean;
    shifts: Shift;
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

export function groupByDay(data: Schedule[]): GroupedResult[] {
    const map = new Map<string, ShiftWithAvailibility[]>();

    for (const item of data) {
        if (!map.has(item.day_of_week)) {
            map.set(item.day_of_week, []);
        }
        const existing = map.get(item.day_of_week)!;

        if (!existing.some((s) => s.availibility_id === item.id)) {
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
            shifts: shifts.sort((a, b) => a.shift.id - b.shift.id), // Ca 1 → Ca 2 → Ca 3
        }))
        .sort(
            (a, b) => daysOrder.indexOf(a.name_date) - daysOrder.indexOf(b.name_date) // Mon → Sun
        );
}
