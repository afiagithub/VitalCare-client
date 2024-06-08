import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineDelete } from "react-icons/md";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Swal from 'sweetalert2'
import LoadingSpinner from "../../shared/LoadingSpinner";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Reservations = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [allReserves, setAllReserves] = useState([])
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-reserve/${id}`)
            setAllReserves(res.data);
            return res.data;            
        }
    })

    const handleSearch = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const res = await axiosSecure.get(`/search-reserve?email=${email}&test_id=${id}`)
        setAllReserves(res.data);
    }

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
                        text: "Reservation has been deleted.",
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
        <div className="z-0 mt-10 px-10 md:px-5">
            <Helmet>
                <title>VitalCare | Bookings</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Reservations</h1>
            <form onSubmit={handleSearch} className="flex flex-row gap-4 items-center justify-end mr-5 md:mr-10 mb-5 md:mb-8">
                <input type="email" name="email" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <button className="btn bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8]">Search</button>
            </form>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Cost</th>
                            <th>Cancel Booking</th>
                            <th>Submit Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allReserves.map(book => <tr key={book._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{book?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{book?.email}</td>
                                <td>{book.date}</td>
                                <td>{book.time}</td>
                                <td>BDT {book.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(book._id, book.test_id)} className="btn bg-red-600 border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-red-600 hover:text-red-600">
                                        <MdOutlineDelete />
                                    </button>
                                </th>
                                <th>
                                    {
                                        book.report === 'pending'? <Link to={`/dashboard/report/${book._id}`} className="btn bg-[#4796c899] border-2 border-transparent text-[#2D3663] 
                                        hover:bg-transparent hover:border-[#2D3663] text-lg">
                                            <IoDocumentAttachOutline />
                                        </Link> : 'Report Delivered'
                                    }
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reservations;