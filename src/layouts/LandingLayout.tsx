import { Footer } from "react-day-picker";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col gap-2">
                <Header />
                <main className="container mx-auto min-h-screen overflow-auto bg-white py-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default LandingLayout;
