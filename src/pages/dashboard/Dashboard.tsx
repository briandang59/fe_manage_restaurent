import { useAuth } from "@/utils/hooks/useAuth";

const Dashboard = () => {
    const { getUser, getRole } = useAuth();
    const user = getUser();
    const role = getRole();

    return (
        <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="text-sm text-gray-600">
                    Xin chào, {user?.user_name} ({role?.role_name})
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">Thống kê tổng quan</h3>
                    <p className="text-gray-600">Quản lý hệ thống nhà hàng</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">Quản lý menu</h3>
                    <p className="text-gray-600">Thêm, sửa, xóa món ăn</p>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-semibold">Quản lý nhân viên</h3>
                    <p className="text-gray-600">Thông tin nhân viên</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
