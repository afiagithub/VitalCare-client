import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const MainLayout = () => {
    return (
        <div className="font-rale lg:max-w-6xl mx-auto px-5 md:px-8 lg:px-0">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;