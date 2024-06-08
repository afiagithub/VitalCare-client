import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashBoardLayout from "../layouts/DashBoardLayout";
import PrivateRoute from "../protected/PrivateRoute"
import Profile from "../components/dashboardCompo/Profile";
import AllTests from "../pages/AllTests";
import TestDetail from "../pages/TestDetail";
import AllTestList from "../components/dashboardCompo/AllTestList";
import UpdateTest from "../components/dashboardCompo/adminCompo/UpdateTest";
import AddTest from "../components/dashboardCompo/adminCompo/AddTest";
import AllUsers from "../components/dashboardCompo/adminCompo/AllUsers";
import AdminRoute from "../routes/AdminRoute"
import BlockedRoute from "./BlockedRoute";
import Appointments from "../components/dashboardCompo/Appointments";
import Reservations from "../components/dashboardCompo/adminCompo/Reservations";
import TestReport from "../components/dashboardCompo/adminCompo/TestReport";
import UserTestReport from "../components/dashboardCompo/UserTestReport";
import AllBanners from "../components/dashboardCompo/adminCompo/AllBanners";
import AddBanner from "../components/dashboardCompo/adminCompo/AddBanner";
import DoctorsList from "../pages/DoctorsList";
import Packages from "../pages/Packages";
import Statistics from "../components/dashboardCompo/adminCompo/Statistics";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/all-tests',
                element: <AllTests></AllTests>
            },
            {
                path: '/test-details/:id',
                element: <PrivateRoute><TestDetail></TestDetail></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/tests/${params.id}`)
            },
            {
                path: '/doctors',
                element: <DoctorsList></DoctorsList>
            },
            {
                path: '/packages',
                element: <Packages></Packages>,
                loader: () => fetch('../fakePackage.json')
            },
            {
                path: '/blog',
                element: <Blogs></Blogs>
            },
            {
                path: '/blog/:id',
                element: <BlogDetails></BlogDetails>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><BlockedRoute><DashBoardLayout></DashBoardLayout></BlockedRoute></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'appointment',
                element: <Appointments></Appointments>
            },
            {
                path: 'test-result',
                element: <UserTestReport></UserTestReport>
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-test-list',
                element: <AllTestList></AllTestList>
            },
            {
                path: 'add-test',
                element: <AddTest></AddTest>
            },
            {
                path: 'update-test/:id',
                element: <UpdateTest></UpdateTest>,
                loader: ({ params }) => fetch(`http://localhost:5000/tests/${params.id}`)
            },
            {
                path: 'reservation/:id',
                element: <Reservations></Reservations>
            },
            {
                path: 'report/:id',
                element: <TestReport></TestReport>
            },
            {
                path: 'banners',
                element: <AllBanners></AllBanners>
            },
            {
                path: 'add-banner',
                element: <AddBanner></AddBanner>
            },
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            }
        ]
    }
]);

export default router;