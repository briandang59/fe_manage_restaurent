import { useMutation, useQuery } from "@tanstack/react-query";
import authApis from "@/apis/authApis";
import { tokenManager } from "@/lib/tokenManager";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Hook để quản lý authentication
export const useAuth = () => {
    const navigate = useNavigate();

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

            const roleName = data.data?.role?.role_name;
            console.log("Role name:", roleName);
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

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            return await authApis.logout();
        },
        onSuccess: () => {
            // Xóa thông tin user và role khỏi localStorage
            tokenManager.removeToken();
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            navigate("/login");
        },
        onError: (error) => {
            toast.error("Đăng xuất thất bại" + error);
            // Vẫn xóa thông tin ngay cả khi API logout thất bại
            tokenManager.removeToken();
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            navigate("/login");
        },
    });

    // Verify token query
    const verifyTokenQuery = useQuery({
        queryKey: ["auth", "verify"],
        queryFn: async () => {
            return await authApis.verifyToken();
        },
        enabled: tokenManager.hasToken(), // Chỉ chạy khi có token
        retry: false, // Không retry nếu thất bại
    });

    // Kiểm tra xem user đã đăng nhập chưa
    const isAuthenticated = tokenManager.hasToken();

    // Login function
    const login = async (username: string, password: string) => {
        await loginMutation.mutateAsync({ username, password });
    };

    // Logout function
    const logout = async () => {
        await logoutMutation.mutateAsync();
    };

    // Kiểm tra token có hợp lệ không
    const isTokenValid = verifyTokenQuery.data?.data?.valid ?? false;

    // Helper functions để lấy thông tin từ localStorage
    const getUser = () => {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
    };

    const getRole = () => {
        const roleStr = localStorage.getItem("role");
        return roleStr ? JSON.parse(roleStr) : null;
    };

    const isAdmin = () => {
        const role = getRole();
        return role?.role_name === "Admin";
    };

    // Kiểm tra authentication và redirect
    const checkAuthAndRedirect = () => {
        const hasToken = tokenManager.hasToken();
        const currentPath = window.location.pathname;

        // Nếu không có token và không ở trang login
        if (!hasToken && currentPath !== "/login") {
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
        isTokenValid,
        isLoading: loginMutation.isPending || logoutMutation.isPending,
        isVerifying: verifyTokenQuery.isLoading,

        // Actions
        login,
        logout,

        // Helper functions
        getUser,
        getRole,
        isAdmin,
        checkAuthAndRedirect,

        // Mutations
        loginMutation,
        logoutMutation,
        verifyTokenQuery,
    };
};
