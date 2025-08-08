import { ReactNode } from "react";
import { useAuthCheck } from "@/utils/hooks/useAuthCheck";

interface AuthWrapperProps {
    children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    useAuthCheck();

    return <>{children}</>;
};

export default AuthWrapper;
