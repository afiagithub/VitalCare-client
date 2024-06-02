import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";

const DashBoardLayout = () => {
    const { logOut } = useAuth();
    const [show, setShow] = useState(false);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged Out")
            })
    }

    const handleCollaspe = () => {
        setShow(!show)
    }
    return (
        <div className="flex flex-row gap-5 relative">
            <div className="md:hidden text-2xl pl-4 pt-5" onClick={handleCollaspe}>
                {
                    show ? <IoIosCloseCircleOutline /> :
                        <IoMdMenu />
                }

            </div>
            <div className={show ?
                'fixed md:hidden translate-y-12 bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4 transition-all duration-200'
                : 'max-w-72 fixed translate-y-12 md:hidden bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4 -translate-x-72 transition-all duration-200'}>
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><Link to='/dashboard/profile'>My Profile</Link></li>
                            <li><Link>My Upcoming Appointments</Link></li>
                            <li><Link>Test Results</Link></li>
                        </ul>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu mt-4">
                            <li><Link to='/'>Home Page</Link></li>
                            <li><Link>All Tests</Link></li>
                        </ul>
                    </div>
                    <div>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><button className="flex flex-row items-center justify-center gap-2"
                                onClick={handleLogOut}>LogOut <IoLogInOutline className="text-xl" /></button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-72 hidden md:flex min-h-screen bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><Link to='/dashboard/profile'>My Profile</Link></li>
                            <li><Link>My Upcoming Appointments</Link></li>
                            <li><Link>Test Results</Link></li>
                        </ul>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu mt-4">
                            <li><Link to='/'>Home Page</Link></li>
                            <li><Link>All Tests</Link></li>
                        </ul>
                    </div>
                    <div>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><button className="flex flex-row items-center justify-center gap-2"
                                onClick={handleLogOut}>LogOut <IoLogInOutline className="text-xl" /></button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoardLayout;