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
                element: <TestDetail></TestDetail>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <Profile></Profile>
            }
        ]
    }
]);

export default router;