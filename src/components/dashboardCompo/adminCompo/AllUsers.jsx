import { useQuery } from "@tanstack/react-query";
import { MdBlock } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { useState } from "react";
import UserModal from "./UserModal";
import Swal from 'sweetalert2'
import { jsPDF } from "jspdf";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const [modal, setModal] = useState({ show: true, data: null });
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleDetails = async (user) => {
        await setModal({ show: true, data: user })
        document.getElementById('my_modal_1').showModal()
    }

    const handleMakeAdmin = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful!",
                        text: "User is now Admin.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }

    const handleBlock = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Block User?"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/block-user/${id}`);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful!",
                        text: "User is now Blocked.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }

    const handleDownload = async (user) => {
        const res = await axiosSecure.get(`/download-reserve/${user.email}`)
        if (res.data) {
            const appoints = res.data.length;

            let pos = 330;
            const doc = new jsPDF('p', 'pt')
            doc.addImage(user.photo, 'PNG', 30, 30, 100, 100);
            doc.text(150, 80, `${user.name}`)
            doc.text(150, 100, `Email: ${user.email}`)
            doc.text(30, 170, `BloodType: ${user.bloodType}`)
            doc.text(30, 190, `District: ${user.dist}`)
            doc.text(30, 210, `Upazila: ${user.upazila}`)
            doc.text(30, 230, `Status: ${user.status}`)
            doc.text(30, 250, `Appointments: ${appoints}`)
            doc.text(30, 300, `Test Title`)
            doc.text(280, 300, `Date`)
            doc.text(380, 300, `Cost`)
            doc.text(450, 300, `Status`)
            for(let i=0; i<appoints; i++){
                doc.text(30, pos, `${res.data[i].title}`)
                doc.text(280, pos, `${res.data[i].date}`)
                doc.text(380, pos, `${res.data[i].price}`)
                doc.text(450, pos, `${res.data[i].report}`)
                pos = pos + 20;
            }            
            doc.save('user.pdf')
        }

    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <Helmet>
                <title>VitalCare | Users</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">All users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Make Admin</th>
                            <th>Block</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user => <tr key={user._id}>
                                <td>
                                    <img src={user.photo} className="rounded-2xl w-16 h-16 object-center" />
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    <button className="btn bg-[#4796c899] border-2 border-transparent text-[#2D3663] 
                                    hover:bg-transparent hover:border-[#2D3663]"
                                        onClick={() => handleDetails(user)}>
                                        See Info
                                    </button>
                                </th>
                                <th>
                                    {
                                        user?.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user._id)}
                                            className="btn bg-[#DAA520] border-2 border-transparent text-white 
                                        font-black text-xl 
                                        hover:bg-transparent hover:border-[#DAA520] hover:text-[#DAA520]">
                                            <IoPersonOutline />
                                        </button>
                                    }
                                </th>
                                <th>
                                    {
                                        user.status === 'blocked' ? 'Blocked' : <button onClick={() => handleBlock(user._id)}
                                            className="btn bg-red-600 border-2 border-transparent text-white 
                                        font-black text-xl 
                                        hover:bg-transparent hover:border-red-600 hover:text-red-600">
                                            <MdBlock />
                                        </button>
                                    }
                                </th>
                                <th>
                                    <button onClick={() => handleDownload(user)} className="btn bg-black border-2 border-transparent text-white font-black text-xl 
                                    hover:bg-transparent hover:border-black hover:text-black">
                                        <BsDownload />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
                {modal.show && modal.data &&
                    <dialog id="my_modal_1" className="modal">
                        <UserModal data={modal.data} ></UserModal>
                    </dialog>}
            </div>
        </div>
    );
};

export default AllUsers;