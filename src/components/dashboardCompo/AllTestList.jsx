import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../shared/LoadingSpinner";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllTestList = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tests = [], isLoading } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data
        },
        refetchOnWindowFocus: false,
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">All Tests</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Bookings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            tests.map(test => <tr key={test._id}>
                                <td>
                                    <img src={test.image} className="rounded-2xl w-16 h-16 object-center" />
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{test.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{test.date}</td>
                                <td>{test.slots}</td>
                                <th>
                                    <Link to={`/dashboard/update-test/${test._id}`} className="btn bg-[#4796c899] border-2 border-transparent text-[#2D3663] font-black text-lg 
                                    hover:bg-transparent hover:border-[#2D3663]">
                                        <FaRegEdit />
                                    </Link>
                                </th>
                                <th>
                                    <button className="btn bg-red-600 border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-red-600 hover:text-red-600">
                                        <MdOutlineDelete />
                                    </button>
                                </th>
                                <th>
                                    <button className="btn bg-[#DAA520] border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-[#DAA520] hover:text-[#DAA520]">
                                        <AiOutlineSchedule />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTestList;