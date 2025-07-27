import { Outlet } from "react-router-dom";
import { Footer } from "react-day-picker";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-auto bg-[#FFF8F0] p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
