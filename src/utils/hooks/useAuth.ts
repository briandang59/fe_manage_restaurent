import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import authApis from "@/apis/authApis";
import { tokenManager } from "@/lib/tokenManager";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/utils/constants/common/paths";

// Hook để quản lý authentication
export const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Sử dụng dynamic path từ router

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: async ({ username, password }: { username: string; password: string }) => {
            return await authApis.login(username, password);
        },
        onSuccess: (data) => {
            if (data.data?.token) {
                tokenManager.setToken(data.data.token);
            }

            if (data.data?.user) {
                localStorage.setItem("user", JSON.stringify(data.data.user));
            }

            if (data.data?.role) {
                localStorage.setItem("role", JSON.stringify(data.data.role));
            }

            if (data.data?.employee) {
                localStorage.setItem("employee", JSON.stringify(data.data.employee));
            }
            const roleName = data.data?.role?.role_name;
            if (roleName === "Admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    // Kiểm tra xem user đã đăng nhập chưa
    const isAuthenticated = tokenManager.hasToken();

    // Login function
    const login = async (username: string, password: string) => {
        await loginMutation.mutateAsync({ username, password });
    };

    // Helper functions để lấy thông tin từ localStorage
    const getUser = () => {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
    };

    const getRole = () => {
        const roleStr = localStorage.getItem("role");
        return roleStr ? JSON.parse(roleStr) : null;
    };

    const getEmployee = () => {
        const employeeStr = localStorage.getItem("employee");
        return employeeStr ? JSON.parse(employeeStr) : null;
    };

    const getToken = () => {
        const token = localStorage.getItem("token");
        return token ? JSON.parse(token) : null;
    };
    const isAdmin = () => {
        const role = getRole();
        return role?.role_name === "Admin";
    };

    // Kiểm tra authentication và redirect (đã sửa: chỉ redirect nếu path không phải public)
    const checkAuthAndRedirect = () => {
        const hasToken = tokenManager.hasToken();
        const currentPath = location.pathname; // Sử dụng dynamic path từ useLocation thay vì window.location

        const publicPaths = [
            "/", // Home
            "/login",
            PATHS.PUBLIC.MENU,
            PATHS.PUBLIC.BOOKING,
            PATHS.PUBLIC.KITCHEN,
            PATHS.PUBLIC.PROFILE,
            PATHS.PUBLIC.TICKET,
            PATHS.PUBLIC.RECRUITMENT,
        ];

        // Check nếu path là public (exact match)
        const isPublic = publicPaths.includes(currentPath);

        console.log(
            "🔍 CheckAuth: Path =",
            currentPath,
            "| IsPublic =",
            isPublic,
            "| HasToken =",
            hasToken
        ); // Log debug (có thể xóa sau)

        // Nếu không có token và KHÔNG ở trang public (ngoại trừ /login)
        if (!hasToken && !isPublic) {
            console.log("🚨 REDIRECT TO LOGIN!");
            navigate("/login");
            return false;
        }

        // Nếu có token và đang ở trang login
        if (hasToken && currentPath === "/login") {
            const role = getRole();
            if (role?.role_name === "Admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
            return true;
        }

        return hasToken;
    };

    return {
        // State
        isAuthenticated,
        isLoading: loginMutation.isPending,

        // Actions
        login,

        // Helper functions
        getUser,
        getRole,
        getEmployee,
        isAdmin,
        checkAuthAndRedirect,
        getToken,

        // Mutations
        loginMutation,
    };
};
