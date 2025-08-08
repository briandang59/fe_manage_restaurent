import { Navigate } from "react-router-dom";
import { tokenManager } from "@/lib/tokenManager";
import { useAuth } from "@/utils/hooks/useAuth";

const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
    const hasToken = tokenManager.hasToken();
    const { getRole } = useAuth();

    if (hasToken) {
        const role = getRole();
        // Redirect dựa trên role
        if (role?.role_name === "Admin") {
            return <Navigate to="/dashboard" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default RedirectIfAuthenticated;
