import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const AllTestList = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tests = [], isLoading, refetch } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete this test!"
        }).then(async (result) => {
            if (result.isConfirmed) {                
                const res = await axiosPublic.delete(`/tests/${id}`);
                if(res.data.deletedCount > 0){                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Test data has been deleted.",
                        icon: "success"
                    });
                }
                refetch()
            }
        });
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <Helmet>
                <title>VitalCare | Tests List</title>
            </Helmet>
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
                                    <button onClick={() => handleDelete(test._id)} className="btn bg-red-600 border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-red-600 hover:text-red-600">
                                        <MdOutlineDelete />
                                    </button>
                                </th>
                                <th>
                                    <Link to={`/dashboard/reservation/${test._id}`} className="btn bg-[#DAA520] border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-[#DAA520] hover:text-[#DAA520]">
                                        <AiOutlineSchedule />
                                    </Link>
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