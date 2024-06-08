import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { MdOutlineDelete } from "react-icons/md";
import LoadingSpinner from "../shared/LoadingSpinner";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet-async";

const Appointments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: appointments = [], isLoading, refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reserve/${user.email}`)
            return res.data
        }
    })

    const handleDelete = (id, test_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete this booking!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reserve/${id}`);
                if (res.data.deletedCount > 0) {
                    const res = await axiosSecure.patch(`/cancel-reserve/${test_id}`)
                    console.log(res.data);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Appointment has been deleted.",
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
                <title>VitalCare | Appointments</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Upcoming Appointments</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Cost</th>
                            <th>Cancel Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            appointments.map(appoint => <tr key={appoint._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{appoint.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{appoint.date}</td>
                                <td>{appoint.time}</td>
                                <td>BDT {appoint.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(appoint._id, appoint.test_id)} className="btn bg-red-600 border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-red-600 hover:text-red-600">
                                        <MdOutlineDelete />
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

export default Appointments;