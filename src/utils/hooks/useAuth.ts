import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import urls from "../constants/urls";
import { BaseResponse } from "@/types/response/baseResponse";

interface LoginCredentials {
  user_name: string;
  password: string;
}

interface LoginResponseData {
  token: string;
}
export type LoginResponse = BaseResponse<LoginResponseData>;
export const useAuth = () => {
  const login = useMutation<BaseResponse<LoginResponse>, AxiosError, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post(
        `/${urls.auth}/${urls.accounts}/${urls.login}`,
        credentials
      );
      localStorage.setItem("token", response.data.data?.token || "");
      return response.data;
    },
  });

  return { login };
};
