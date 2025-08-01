import { useMutation, useQuery } from "@tanstack/react-query";
import authApis from "@/apis/authApis";
import { tokenManager } from "@/lib/tokenManager";
import { useNavigate } from "react-router-dom";

// Hook để quản lý authentication
export const useAuth = () => {
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      return await authApis.login(username, password);
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Redirect sau khi login thành công
      navigate("/dashboard");
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
      console.log("Logout successful");
      // Redirect về trang login
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Vẫn redirect về login ngay cả khi API logout thất bại
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

  return {
    // State
    isAuthenticated,
    isTokenValid,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    isVerifying: verifyTokenQuery.isLoading,
    
    // Actions
    login,
    logout,
    
    // Mutations
    loginMutation,
    logoutMutation,
    verifyTokenQuery,
  };
};
