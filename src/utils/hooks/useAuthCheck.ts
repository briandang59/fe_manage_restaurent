import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import { tokenManager } from "@/lib/tokenManager";

export const useAuthCheck = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy path động thay vì window.location

    useEffect(() => {
        const checkAuth = () => {
            const hasToken = tokenManager.hasToken();
            const currentPath = location.pathname;

            // Danh sách public routes (không cần token)
            const publicPaths = ["/", "/login", "/menu", "/booking"]; // Thêm paths từ PATHS.PUBLIC

            // Nếu không có token VÀ path không public → redirect login
            if (!hasToken && !publicPaths.includes(currentPath)) {
                console.log("[DEBUG] Redirect to login: No token + not public path");
                navigate("/login");
                return;
            }

            // Nếu có token và đang ở login → redirect dựa trên role
            if (hasToken && currentPath === "/login") {
                const roleStr = localStorage.getItem("role");
                const role = roleStr ? JSON.parse(roleStr) : null;

                if (role?.role_name === "Admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/"); // Hoặc public dashboard nếu có
                }
                return;
            }
        };

        checkAuth();
    }, [navigate, location.pathname]); // Depend trên path để re-run khi change route

    return {
        isAuthenticated: tokenManager.hasToken(),
    };
};
