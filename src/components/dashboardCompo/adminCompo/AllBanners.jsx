import { useQuery } from "@tanstack/react-query";
import { MdOutlineDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import Swal from 'sweetalert2'
import LoadingSpinner from "../../shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AllBanners = () => {
    const axiosSecure = useAxiosSecure();
    const { data: banners = [], isLoading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners')
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    const handleActive = async (id) => {
        const res = await axiosSecure.patch(`/banners/${id}`)
        if (res.data.result2.modifiedCount > 0) {
            Swal.fire({
                title: "Successful!",
                text: "Banner is Active Now.",
                icon: "success"
            });
            refetch()
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete this banner!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/banners/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Banner data has been deleted.",
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
                <title>VitalCare | Banners</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">All banners</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Heading</th>
                            <th>Make Active</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            banners.map(banner => <tr key={banner._id}>
                                <td>
                                    <img src={banner.image} className="rounded-2xl w-16 h-16 object-center" />
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{banner.heading}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    {
                                        banner.isActive === true ? 'Active' :
                                            <button onClick={() => handleActive(banner._id)}
                                                className="btn bg-green-200 border-2 border-transparent text-green-800 
                                    font-black text-lg hover:bg-transparent hover:border-green-800">
                                                <SiTicktick />
                                            </button>
                                    }
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(banner._id)} className="btn bg-red-600 border-2 border-transparent text-white font-black text-xl 
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

export default AllBanners;