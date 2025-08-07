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
const Attachments = lazy(() => import("@/pages/manage/Attachments"));
const Role = lazy(() => import("@/pages/role-permission/Role"));
const Permission = lazy(() => import("@/pages/role-permission/Permission"));
const AccountPermission = lazy(() => import("@/pages/role-permission/AccountPermisison"));
const Attendance = lazy(() => import("@/pages/manage/Attendance"));
const Schedules = lazy(() => import("@/pages/manage/Schedules"));
const Orders = lazy(() => import("@/pages/manage/Orders"));
const Warehouse = lazy(() => import("@/pages/manage/Warehouse"));
const Staff = lazy(() => import("@/pages/manage/Staff"));
const Table = lazy(() => import("@/pages/manage/Table"));
const Avaibilities = lazy(() => import("@/pages/manage/Avaibilities"));

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
                path: PATHS.MANAGE.ATTACHMENTS,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Attachments />
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
            {
                path: PATHS.ROLE_PERMISSION.ACCOUNT_PERMISSION,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AccountPermission />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.ATTENDANCE,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Attendance />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.SCHEDULES,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Schedules />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.ORDERS,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Orders />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.WAREHOUSE,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Warehouse />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.STAFFS,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Staff />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.TABLES,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Table />
                    </Suspense>
                ),
            },
            {
                path: PATHS.MANAGE.AVAILIBILITIES,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Avaibilities />
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
