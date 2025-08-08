// components/Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    LayoutDashboard,
    Utensils,
    User,
    ClipboardList,
    LogOut,
    Timer,
    Calendar,
    ChartArea,
    Ham,
    File,
    Table,
} from "lucide-react";
import useLogout from "@/utils/hooks/useLogout";
import images from "@/assets/images";
import Image from "@/components/ui/image";
import { PATHS } from "@/utils/constants/common/paths";

const Sidebar = () => {
    const { logout } = useLogout();
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
        management: true,
    });

    const toggleMenu = (key: string) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const menus = [
        {
            label: "Quản lý",
            icon: <LayoutDashboard className="size-4" />,
            key: "management",
            children: [
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}`,
                    label: "Thống kê",
                    icon: <ChartArea size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.STAFFS}`,
                    label: "Nhân viên",
                    icon: <User size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.INGREDIENTS}`,
                    label: "Nguyên liệu",
                    icon: <Ham size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.ORDERS}`,
                    label: "Đơn hàng",
                    icon: <ClipboardList size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.MENU}`,
                    label: "Thực đơn",
                    icon: <Utensils size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.ATTACHMENTS}`,
                    label: "Tài liệu",
                    icon: <File size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.TABLES}`,
                    label: "Bàn",
                    icon: <Table size={14} />,
                },
            ],
        },
        {
            label: "Lịch làm",
            icon: <LayoutDashboard className="size-4" />,
            key: "shift",
            children: [
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.SHIFTS}`,
                    label: "Lịch làm việc",
                    icon: <Calendar size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.ATTENDANCE}`,
                    label: "Chấm công",
                    icon: <Timer size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.AVAILIBILITIES}`,
                    label: "Lịch rảnh",
                    icon: <Calendar size={14} />,
                },
            ],
        },
        {
            label: "Phân quyền",
            icon: <LayoutDashboard className="size-4" />,
            key: "role-permission",
            children: [
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.ROLE}`,
                    label: "Vai trò",
                    icon: <ChartArea size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.PERMISSION}`,
                    label: "Quyền hạn",
                    icon: <User size={14} />,
                },
                {
                    to: `/${PATHS.MANAGE.DASHBOARD}/${PATHS.MANAGE.ACCOUNT_PERMISSION}`,
                    label: "Tài khoản",
                    icon: <User size={14} />,
                },
            ],
        },
    ];

    return (
        <aside className="flex w-64 flex-col bg-[#3E2723] text-[#FFF3E0] shadow-md">
            <div className="flex items-center gap-4 border-b border-[#5D4037] p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={images.logo}
                        alt="Mộc Quán Logo"
                        className="h-10 w-10 rounded-[10px] object-cover"
                    />
                    <span className="text-xl font-bold tracking-wide">MỘC QUÁN</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 p-4 text-sm">
                {menus.map((item) =>
                    item.children ? (
                        <div key={item.key}>
                            <button
                                onClick={() => toggleMenu(item.key)}
                                className="flex w-full items-center justify-between rounded px-4 py-2 text-left transition-colors duration-300 hover:bg-[#5D4037]"
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {openMenus[item.key] ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </button>

                            <AnimatePresence initial={false}>
                                {openMenus[item.key] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-6 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.to}
                                                    to={child.to}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-2 rounded px-3 py-2 transition duration-200 hover:bg-[#5D4037] ${
                                                            isActive ? "bg-[#6D4C41]" : ""
                                                        }`
                                                    }
                                                >
                                                    {child.icon}
                                                    <span>{child.label}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <NavLink
                            key={item.key}
                            to={item.key}
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded px-4 py-2 transition duration-200 hover:bg-[#5D4037] ${
                                    isActive ? "bg-[#6D4C41]" : ""
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    )
                )}

                <button
                    onClick={logout}
                    className="mt-2 flex w-full items-center gap-2 rounded px-4 py-2 text-left transition duration-200 hover:bg-[#5D4037]"
                >
                    <LogOut className="size-4" />
                    <span className="font-medium">Đăng xuất</span>
                </button>
            </nav>

            <div className="border-t border-[#5D4037] p-4 text-xs text-[#D7CCC8]">
                © 2025 Mộc Quán
            </div>
        </aside>
    );
};

export default Sidebar;
