import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import RequireAuth from "@/components/common/RquiredAuth";
import RedirectIfAuthenticated from "@/components/common/RedirectIfAuthenticated";

const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">Loading...</div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <Suspense fallback={<LoadingFallback />}>
          <Login />
        </Suspense>
      </RedirectIfAuthenticated>
    ),
  },
]);
