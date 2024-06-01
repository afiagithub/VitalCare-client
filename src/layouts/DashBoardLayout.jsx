import { Link, Outlet } from "react-router-dom";

const DashBoardLayout = () => {    
    return (
        <div className="flex flex-row gap-5">
            <div className="max-w-72 min-h-screen bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4">
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
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoardLayout;