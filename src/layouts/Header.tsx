import images from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useAuth } from "@/utils/hooks/useAuth";
import { User } from "lucide-react";

function Header() {
    const { getUser, getRole, logout } = useAuth();
    const user = getUser();
    const role = getRole();
    return (
        <header className="container sticky top-[10px] z-50 mx-auto rounded-[10px] border border-gray-100 bg-[#E7CEAC] p-4">
            <div className="flex items-center justify-between gap-2">
                <Image
                    src={images.logo}
                    alt="logo"
                    width={50}
                    height={50}
                    className="rounded-[10px]"
                />
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <User className="text-[#3B2010]" />
                        <span className="text-sm font-medium text-[#3B2010]">
                            {user?.user_name} - ({role?.role_name})
                        </span>
                    </div>
                    <Button variant="outline" onClick={logout}>
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
