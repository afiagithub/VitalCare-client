import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdBlock } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { useState } from "react";
import UserModal from "./UserModal";
import Swal from 'sweetalert2'

const AllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const [modal, setModal] = useState({ show: true, data: null });
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })

    const handleDetails = (user) => {
        document.getElementById('my_modal_1').showModal()
        setModal({ show: true, data: user })
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
                const res = await axiosPublic.patch(`/users/${id}`);
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
                const res = await axiosPublic.patch(`/block-user/${id}`);
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
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
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
                                        Details
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
                                    <button className="btn bg-black border-2 border-transparent text-white font-black text-xl 
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
                        <UserModal data={modal.data}></UserModal>
                    </dialog>}
            </div>
        </div>
    );
};

export default AllUsers;