export function CheckTime(time: string) {
    if (time === "00:00") return "12:00";
    return time;
}
