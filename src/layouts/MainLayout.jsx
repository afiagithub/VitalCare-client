import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";


const MainLayout = () => {
    return (
        <div className="font-rale lg:max-w-6xl mx-auto px-5 md:px-0">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;