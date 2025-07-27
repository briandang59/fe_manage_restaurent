import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse } from "@/types/response/baseResponse";
import authApis from "@/apis/authApis";

interface LoginCredentials {
  user_name: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
}

export const useAuth = () => {
  const login = useMutation<BaseResponse<LoginResponseData>, AxiosError, LoginCredentials>({
    mutationFn: async (credentials) => {
      return await authApis.login(credentials.user_name, credentials.password);
    },
  });

  return { login };
};
