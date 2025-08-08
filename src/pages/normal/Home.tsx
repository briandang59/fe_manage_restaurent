import { useAuth } from "@/utils/hooks/useAuth";

const Home = () => {
    const { getUser, getRole } = useAuth();
    const user = getUser();
    const role = getRole();

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Trang chủ</h1>
                <div className="text-sm text-gray-600">
                    Xin chào, {user?.user_name} ({role?.role_name})
                </div>
            </div>

            <div className="text-center">
                <h2 className="mb-4 text-xl font-semibold">
                    Chào mừng đến với hệ thống quản lý nhà hàng
                </h2>
                <p className="text-gray-600">
                    Đây là trang dành cho người dùng thường. Bạn có thể xem thông tin cơ bản tại
                    đây.
                </p>
            </div>
        </div>
    );
};

export default Home;
