import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import RequireAuth from "@/components/common/RquiredAuth";
import RedirectIfAuthenticated from "@/components/common/RedirectIfAuthenticated";
import AuthWrapper from "@/components/common/AuthWrapper";
import { PATHS } from "@/utils/constants/common/paths";
import LandingLayout from "@/layouts/LandingLayout";

const Home = lazy(() => import("@/pages/main/Home"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const Menu = lazy(() => import("@/pages/dashboard/Menu"));
const MenuPublic = lazy(() => import("@/pages/main/Menu"));
const Attachments = lazy(() => import("@/pages/dashboard/Attachments"));
const Role = lazy(() => import("@/pages/role-permission/Role"));
const Permission = lazy(() => import("@/pages/role-permission/Permission"));
const AccountPermission = lazy(() => import("@/pages/role-permission/AccountPermisison"));
const Attendance = lazy(() => import("@/pages/dashboard/Attendance"));
const Orders = lazy(() => import("@/pages/dashboard/Orders"));
const Staff = lazy(() => import("@/pages/dashboard/Staff"));
const Table = lazy(() => import("@/pages/dashboard/Table"));
const Avaibilities = lazy(() => import("@/pages/dashboard/Avaibilities"));
const Ingredient = lazy(() => import("@/pages/dashboard/Ingredient"));
const Shift = lazy(() => import("@/pages/dashboard/Shift"));
const Booking = lazy(() => import("@/pages/main/Booking"));
const Kitchen = lazy(() => import("@/pages/main/Kitchen"));
const Profile = lazy(() => import("@/pages/main/Profile"));
const Ticket = lazy(() => import("@/pages/main/Ticket"));

const LoadingFallback = () => (
    <div className="flex h-screen items-center justify-center">Loading...</div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthWrapper>
                <LandingLayout />
            </AuthWrapper>
        ),
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.PUBLIC.MENU}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <MenuPublic />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.PUBLIC.BOOKING}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Booking />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.PUBLIC.KITCHEN}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Kitchen />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.PUBLIC.PROFILE}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Profile />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.PUBLIC.TICKET}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Ticket />
                    </Suspense>
                ),
            },
        ],
    },

    {
        path: `/${PATHS.MANAGE.DASHBOARD}`,
        element: (
            <RequireAuth>
                <MainLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.MENU}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Menu />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.ATTACHMENTS}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Attachments />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.ROLE}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Role />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.PERMISSION}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Permission />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.ACCOUNT_PERMISSION}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AccountPermission />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.ATTENDANCE}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Attendance />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.ORDERS}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Orders />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.STAFFS}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Staff />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.TABLES}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Table />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.AVAILIBILITIES}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Avaibilities />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.INGREDIENTS}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Ingredient />
                    </Suspense>
                ),
            },
            {
                path: `${PATHS.MANAGE.SHIFTS}`,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Shift />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: (
            <AuthWrapper>
                <RedirectIfAuthenticated>
                    <Suspense fallback={<LoadingFallback />}>
                        <Login />
                    </Suspense>
                </RedirectIfAuthenticated>
            </AuthWrapper>
        ),
    },
]);
