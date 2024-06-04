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
            }
        ]
    }
]);

export default router;