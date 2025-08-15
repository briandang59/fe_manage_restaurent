import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const INFORMATION = [
    {
        icon: <MapPin strokeWidth={1.5} className="h-6 w-6 text-orange-600" />,
        title: "Địa chỉ",
        description: "123 Đường ABC, Quận XYZ, TP. HCM",
    },
    {
        icon: <Phone strokeWidth={1.5} className="h-6 w-6 text-orange-600" />,
        title: "Điện thoại",
        description: "0909090909",
    },
    {
        icon: <Mail strokeWidth={1.5} className="h-6 w-6 text-orange-600" />,
        title: "Email",
        description: "info@nhahangvietnam.com",
    },
    {
        icon: <Clock strokeWidth={1.5} className="h-6 w-6 text-orange-600" />,
        title: "Giờ Mở Cửa",
        description: "Thứ 2 - Chủ Nhật: 11:00 - 14:00, 18:00 - 22:00",
    },
];
