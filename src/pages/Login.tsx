import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms-component/FormInput";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import images from "@/assets/images";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthRequestTypes } from "@/types/request/auth";
import { LoginResponseData, useAuth } from "@/utils/hooks/useAuth";
import { BaseResponse } from "@/types/response/baseResponse";

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AuthRequestTypes>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: AuthRequestTypes) => {
    try {
      login.mutate(data, {
        onSuccess: (responseData: BaseResponse<LoginResponseData>) => {
          toast.success("Đăng nhập thành công");
          localStorage.setItem("token", responseData.data?.token || "");

          navigate("/", { replace: true });
        },
        onError: (error: any) => {
          toast.error(error.message || "Đăng nhập thất bại");
        },
      });
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-pink-500">
      <div className="flex min-w-[400px] flex-col items-center rounded-[10px] border border-gray-200 bg-white p-4 shadow-md">
        <Image
          src={images.logo}
          alt="logo"
          width={100}
          height={100}
          className="mb-6 rounded-[10px]"
        />
        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            label="Mã số nhân viên"
            name="user_name"
            errors={errors}
            required
            disabled={isSubmitting}
          />
          <FormInput
            control={control}
            label="Mật khẩu"
            name="password"
            type="password"
            errors={errors}
            required
            disabled={isSubmitting}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting || login.isPending}>
            {login.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
