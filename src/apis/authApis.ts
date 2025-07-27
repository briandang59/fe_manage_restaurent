import { axiosInstance } from "@/lib/axiosInstance";
import urls from "@/utils/constants/urls";

const authApis = {
  login: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post(`/${urls.auth}/${urls.accounts}/${urls.login}`, {
        user_name: username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default authApis;
