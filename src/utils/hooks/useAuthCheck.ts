import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenManager } from "@/lib/tokenManager";

export const useAuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const hasToken = tokenManager.hasToken();
            const currentPath = window.location.pathname;

            // Nếu không có token và không ở trang login
            if (!hasToken && currentPath !== "/login") {
                navigate("/login");
                return;
            }

            // Nếu có token và đang ở trang login
            if (hasToken && currentPath === "/login") {
                const roleStr = localStorage.getItem("role");
                const role = roleStr ? JSON.parse(roleStr) : null;

                if (role?.role_name === "Admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
                return;
            }
        };

        checkAuth();
    }, [navigate]);

    return {
        isAuthenticated: tokenManager.hasToken(),
    };
};
