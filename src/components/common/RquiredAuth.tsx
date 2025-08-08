import { Navigate, useLocation } from "react-router-dom";
import { tokenManager } from "@/lib/tokenManager";
import { useAuth } from "@/utils/hooks/useAuth";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const hasToken = tokenManager.hasToken();
    const location = useLocation();
    const { getRole } = useAuth();

    if (!hasToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Kiểm tra xem user có quyền truy cập dashboard không
    const role = getRole();
    const isAdmin = role?.role_name === "Admin";

    // Nếu không phải Admin và đang cố truy cập dashboard
    if (!isAdmin && location.pathname.startsWith("/dashboard")) {
        // Redirect về home nếu không phải Admin
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
