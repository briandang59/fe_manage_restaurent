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
} from "lucide-react";
import useLogout from "@/utils/hooks/useLogout";

const Sidebar = () => {
  const { logout } = useLogout();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({ management: true });

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menus = [
    {
      label: "Quản lý",
      icon: <LayoutDashboard className="size-4" />,
      key: "management",
      children: [
        { to: "/dashboard", label: "Thống kê", icon: <ChartArea size={14} /> },
        { to: "/staffs", label: "Nhân viên", icon: <User size={14} /> },
        { to: "/warehouse", label: "Nguyên liệu", icon: <Ham size={14} /> },
        { to: "/orders", label: "Đơn hàng", icon: <ClipboardList size={14} /> },
        { to: "/schedules", label: "Lịch làm việc", icon: <Calendar size={14} /> },
        { to: "/attendance", label: "Chấm công", icon: <Timer size={14} /> },
      ],
    },
    {
      to: "/menu",
      label: "Thực đơn",
      icon: <Utensils className="size-4" />,
    },
  ];

  return (
    <aside className="flex w-64 flex-col bg-[#4E342E] text-[#FBE9E7]">
      <div className="flex items-center gap-4 border-b border-[#6D4C41] p-4">
        <div className="text-xl font-bold">MỘC QUÁN</div>
      </div>

      <nav className="flex-1 space-y-1 p-4 text-sm">
        {menus.map((item) =>
          item.children ? (
            <div key={item.key}>
              <button
                onClick={() => toggleMenu(item.key)}
                className="flex w-full items-center justify-between rounded px-4 py-2 duration-300 hover:bg-[#6D4C41]"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {openMenus[item.key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence initial={false}>
                {openMenus[item.key] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            `flex items-center gap-2 rounded p-2 duration-300 hover:bg-[#6D4C41] ${
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
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded px-4 py-2 duration-300 hover:bg-[#6D4C41] ${
                  isActive ? "bg-[#6D4C41]" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          )
        )}

        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded px-4 py-2 text-left hover:bg-[#6D4C41]"
        >
          <LogOut className="size-4" />
          <span>Đăng xuất</span>
        </button>
      </nav>

      <div className="border-t border-[#6D4C41] p-4 text-xs">© 2025 Mộc Quán</div>
    </aside>
  );
};

export default Sidebar;
