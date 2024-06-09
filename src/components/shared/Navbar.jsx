import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
    const { user, logOut } = useAuth();
    const handleSigOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged Out")
            })
    }
    const links = <>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent "} to="/">Home</NavLink></li>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent"} to="/doctors">Doctors List</NavLink></li>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent"} to="/all-tests">All Tests</NavLink></li>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent"} to="/packages">Packages</NavLink></li>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent"} to="/blog">Blogs</NavLink></li>
    </>
    return (
        <div className="navbar py-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                        {
                            user ? <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
                                : "border-2 border-transparent"} to="/dashboard/profile">Dashboard</NavLink></li> : ''
                        }
                    </ul>
                </div>
                <a href="/" className="btn btn-ghost text-2xl text-[#2D3663] font-bold font-ubuntu">VitalCare</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                    {
                        user ? <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
                            : "border-2 border-transparent"} to="/dashboard/profile">Dashboard</NavLink></li> : ''
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex flex-row gap-3">
                        <button data-tooltip-id="user_logo" data-tooltip-content={user.displayName}
                            data-tooltip-place="bottom">
                            <img className="w-12 h-12 rounded-full"
                                src={user.photoURL || 'https://i.ibb.co/QnTrVRz/icon.jpg'} alt="" /></button>
                        <Tooltip id="user_logo" />
                        <NavLink onClick={handleSigOut} className="btn bg-[#ff494a] text-white px-4 border-2 border-[#ff494a] 
            hover:border-[#ff494a] hover:bg-transparent hover:text-[#ff494a]" to="/">LogOut</NavLink>
                    </div> :
                        <div className="flex flex-row gap-4">
                            <NavLink className="btn bg-[#2D3663] text-white border-2 border-[#2D3663] 
                                hover:border-[#2D3663] hover:bg-transparent hover:text-[#2D3663]" to="/login">Login</NavLink>
                            <NavLink className="btn bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                                hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8]" to="/register">Register</NavLink>
                        </div>

                }

            </div>
        </div >
    );
};

export default Navbar;