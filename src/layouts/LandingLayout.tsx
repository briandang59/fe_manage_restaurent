import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="min-h-screen overflow-auto bg-white pt-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default LandingLayout;
