import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms-component/FormInput";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import images from "@/assets/images";
import toast from "react-hot-toast";
import { AuthRequestTypes } from "@/types/request/auth";
import { useAuth } from "@/utils/hooks/useAuth";

function Login() {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AuthRequestTypes>();

    const { loginMutation } = useAuth();

    const onSubmit = async (data: AuthRequestTypes) => {
        try {
            await loginMutation.mutateAsync({ username: data.user_name, password: data.password });
            toast.success("Đăng nhập thành công");
        } catch (error: any) {
            toast.error(error.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4E342E] to-[#FFF8F0]">
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

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
