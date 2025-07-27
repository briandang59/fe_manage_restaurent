import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms-component/FormInput";
import { FormCheckbox } from "@/components/forms-component/FormCheckbox";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import images from "@/assets/images";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    // Xử lý đăng nhập ở đây
    console.log(data);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-pink-500">
      <div className="p-4 rounded-[10px] border border-gray-200 shadow-md bg-white flex flex-col items-center min-w-[400px]">
 <Image src={images.logo} alt="logo" width={100} height={100} className="mb-6 rounded-[10px]" />
      <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
        control={control}
          label="Mã số nhân viên"
          name="username"
          register={register}
          errors={errors}
          required
        />
        <FormInput  
          control={control}
          label="Mật khẩu"
          name="password"
          type="password"
          register={register}
          errors={errors}
          required
        />
        <FormCheckbox
          name="remember"
          control={control}
          label="Ghi nhớ đăng nhập"
          errors={errors}
        />
        <Button type="submit" className="w-full">Đăng nhập</Button>
      </form>
      </div>
     
    </div>
  );
}

export default Login;