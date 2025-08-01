import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import RequireAuth from "@/components/common/RquiredAuth";
import RedirectIfAuthenticated from "@/components/common/RedirectIfAuthenticated";
import { PATHS } from "@/utils/constants/common/paths";

const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const ManageMenu = lazy(() => import("@/pages/manage/Menu"));
const Role = lazy(() => import("@/pages/role-permission/Role"));
const Permission = lazy(() => import("@/pages/role-permission/Permission"));

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
        path: PATHS.MANAGE.DASHBOARD,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: PATHS.MANAGE.MENU,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManageMenu />
          </Suspense>
        ),
      },
      {
        path: PATHS.ROLE_PERMISSION.ROLE,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Role />
          </Suspense>
        ),
      },
      {
        path: PATHS.ROLE_PERMISSION.PERMISSION,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Permission />
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
