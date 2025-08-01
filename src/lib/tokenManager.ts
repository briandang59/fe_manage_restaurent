// Token management utilities
export const tokenManager = {
  // Lấy token từ localStorage
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  // Lưu token vào localStorage
  setToken: (token: string): void => {
    localStorage.setItem("token", token);
  },

  // Xóa token khỏi localStorage
  removeToken: (): void => {
    localStorage.removeItem("token");
  },

  // Kiểm tra xem có token hay không
  hasToken: (): boolean => {
    return !!localStorage.getItem("token");
  },

  // Lấy token với Bearer prefix
  getBearerToken: (): string | null => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
  },
};

// Hook để quản lý token (nếu cần)
export const useToken = () => {
  const getToken = () => tokenManager.getToken();
  const setToken = (token: string) => tokenManager.setToken(token);
  const removeToken = () => tokenManager.removeToken();
  const hasToken = () => tokenManager.hasToken();

  return {
    getToken,
    setToken,
    removeToken,
    hasToken,
  };
}; 