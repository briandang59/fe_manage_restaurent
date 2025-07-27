import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công");
    navigate("/login", { replace: true });
  };

  return { logout };
};

export default useLogout;
