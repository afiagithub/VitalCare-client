import { NavLink } from "react-router-dom";


const Navbar = () => {
    const links = <>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent "} to="/">Home</NavLink></li>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent"} to="/about">Dashboard</NavLink></li>
        <li className="bg-transparent mx-2 font-bold"><NavLink className={({ isActive }) => isActive ? "border-2 border-[#47CCC8] text-[#47CCC8]"
            : "border-2 border-transparent"} to="/assignment">All Tests</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Medicare</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex flex-row gap-4">
                    <NavLink className="btn bg-[#2D3663] text-white border-2 border-[#2D3663] 
                            hover:border-[#2D3663] hover:bg-transparent hover:text-[#2D3663]" to="/login">Login</NavLink>
                    <NavLink className="btn bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                            hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8]" to="/register">Register</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;