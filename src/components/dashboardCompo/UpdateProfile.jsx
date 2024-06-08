import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import getUser from "../../hooks/getUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useDistrict from "../../hooks/useDistrict";
import useUpazilla from "../../hooks/useUpazilla";

const UpdateProfile = () => {
    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

    const [currentUser, isLoading, refetch] = getUser(); 
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [districtData, distLoading] = useDistrict();
    const [upazilaData, upzilaLoad] = useUpazilla();
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const bloodType = form.bloodType.value;
        const dist = form.dist.value;
        const upazila = form.upazila.value;
        const image = form.photo.files[0];
        let photoURL = '';

        if (image) {
            const imageFile = { image };
            const resImg = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (resImg.data.success) {
                photoURL = resImg.data.data.display_url;
            }            
        } 
        else {
            photoURL = currentUser.photo;
        }       
        const { _id, email, user_id, status } = currentUser;

        const updatedInfo = {
            name: fullName,
            email,
            user_id,
            photo: photoURL,
            bloodType,
            dist,
            upazila,
            status
        }
        const res = await axiosPublic.put(`/users/${_id}`, updatedInfo);
        console.log(res);
        if (res.data.modifiedCount > 0) {
            refetch()
            navigate('/dashboard/profile')
            toast.success("Successfully Updated Profile")
        }
    }
    if (isLoading || distLoading || upzilaLoad) {
        <div className="text-center flex flex-col items-center justify-center h-[100vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    }
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-3xl font-bold text-[#20B2AA]">Update Your Profile</h1>
            </div>
            <form onSubmit={handleUpdate} className="space-y-8 text-left">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Full Name</label>
                        <input type="text" name="fullName" defaultValue={currentUser.name}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Photo URL</label>
                        <input type="file" name="photo"
                            className="file-input file-input-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Blood Group</label>
                        <select name="bloodType"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option selected value={`${currentUser.bloodType}`} disabled>{currentUser.bloodType}</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">District</label>
                        <select name="dist"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option selected value={`${currentUser.dist}`} disabled>{currentUser.dist}</option>
                            {
                                districtData.map(district => 
                                    <option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Upazila</label>
                        <select name="upazila"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option selected value={`${currentUser.upazila}`} disabled>{currentUser.upazila}</option>
                            {
                                upazilaData.map(upazila => 
                                <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Update Profile"
                        className="w-full px-8 py-3 bg-[#47CCC8] text-[#2D3663] text-lg font-semibold rounded-xl 
                            border-2 border-[#47CCC8] hover:border-[#47CCC8] hover:bg-transparent 
                            hover:text-[#47CCC8]" />
                </div>
            </form>

        </div>
    );
};

export default UpdateProfile;