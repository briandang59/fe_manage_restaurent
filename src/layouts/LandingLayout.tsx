import { Footer } from "react-day-picker";
import Header from "./Header";

interface LandingLayoutProps {
    children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="min-h-screen overflow-auto bg-white p-6">{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default LandingLayout;
