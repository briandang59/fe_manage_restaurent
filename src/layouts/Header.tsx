import images from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { PATHS } from "@/utils/constants/common/paths";
import { useAuth } from "@/utils/hooks/useAuth";
import useLogout from "@/utils/hooks/useLogout";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const { getUser, getRole, getEmployee } = useAuth();
    const { logout } = useLogout();
    const user = getUser();
    const employee = getEmployee();
    const role = getRole();
    const navigate = useNavigate();
    const isAuthenticated = useAuth().isAuthenticated; // Sử dụng isAuthenticated từ useAuth để check token (thay vì getToken nếu chưa có)
    const pages = [
        {
            key: "home",
            name: "Trang chủ",
            path: PATHS.MANAGE.HOME,
            roles: [
                "Quản lý",
                "Thu ngân",
                "Phục vụ",
                "Đầu bếp",
                "Nhân viên bếp",
                "Nhân viên kho",
                "Khách hàng",
            ],
        },
        {
            key: "menu",
            name: "Thực đơn",
            path: `/${PATHS.PUBLIC.MENU}`,
            roles: ["Quản lý", "Thu ngân", "Phục vụ"],
        },
        {
            key: "booking",
            name: "Đặt bàn",
            path: `/${PATHS.PUBLIC.BOOKING}`,
            roles: ["Quản lý", "Thu ngân", "Phục vụ", "Khách hàng"],
        },
        {
            key: "kitchen",
            name: "Bếp",
            path: `/${PATHS.PUBLIC.KITCHEN}`,
            roles: ["Quản lý", "Phục vụ", "Đầu bếp", "Nhân viên bếp", "Khách hàng"],
        },
        {
            key: "ticket",
            name: "Nhập - Xuất nguyên vật liệu",
            path: `/${PATHS.PUBLIC.TICKET}`,
            roles: ["Quản lý", "Đầu bếp", "Nhân viên bếp", "Nhân viên kho", "Khách hàng"],
        },
        {
            key: "recruitment",
            name: "Tuyển dụng",
            path: `/${PATHS.PUBLIC.RECRUITMENT}`,
            roles: [
                "Quản lý",
                "Thu ngân",
                "Phục vụ",
                "Đầu bếp",
                "Nhân viên bếp",
                "Nhân viên kho",
                "Khách hàng",
            ],
        },
    ];

    // Public pages: Luôn hiển thị nếu chưa login
    const publicPageKeys = ["home", "booking", "recruitment"];

    // Filter logic: Nếu chưa login (không có role), chỉ show public pages; Nếu login, show theo roles
    const filteredPages = pages.filter((page) => {
        if (!role) {
            // Chưa login: Chỉ show public pages
            return publicPageKeys.includes(page.key);
        }
        // Đã login: Filter theo roles
        return page.roles.includes(role.role_name);
    });

    return (
        <header className="sticky left-0 right-0 top-0 z-50 mx-auto w-full rounded-[4px] border-b bg-white p-4">
            <div className="container mx-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-8">
                    <Image
                        src={images.logo}
                        alt="logo"
                        width={50}
                        height={50}
                        className="rounded-[10px]"
                    />
                    <div className="flex items-center gap-[40px]">
                        {filteredPages.map((page) => (
                            <Link
                                key={page.key}
                                to={page.path}
                                className="text-sm font-medium text-[#3B2010] duration-300 hover:text-[#5D4037]"
                            >
                                {page.name}
                            </Link>
                        ))}
                    </div>
                </div>
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2"
                            onClick={() => navigate(PATHS.PUBLIC.PROFILE)}
                        >
                            <User className="text-[#3B2010]" />
                            <span className="text-sm font-medium text-[#3B2010]">
                                {employee?.full_name} - {user?.user_name} - ({role?.role_name})
                            </span>
                        </button>
                        <Button variant="outline" onClick={logout}>
                            Đăng xuất
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate(`/${PATHS.PUBLIC.LOGIN}`)}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
