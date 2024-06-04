import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { MdOutlineDelete } from "react-icons/md";
import LoadingSpinner from "../shared/LoadingSpinner";

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
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Upcoming Appointments</h1>
            <p>{appointments.length}</p>
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
                                            <div className="font-bold">{appoint.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{appoint.date}</td>
                                <td>{appoint.time}</td>
                                <td>BDT {appoint.price}</td>
                                <th>
                                    <button className="btn bg-red-600 border-2 border-transparent text-white font-black text-xl 
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