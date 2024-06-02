import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import getUser from "../../hooks/getUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UpdateProfile = () => {
    const [currentUser, isLoading, refetch] = getUser();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const photoUrl = form.photoUrl.value;
        const bloodType = form.bloodType.value;
        const dist = form.dist.value;
        const upazila = form.upazila.value;

        const { _id, email, user_id, status } = currentUser;        

        const updatedInfo = {
            name: fullName,
            email,
            user_id,
            photo: photoUrl,
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
            toast.success("Successfully Registered")
        }
    }
    if (isLoading) {
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
                        <input type="text" name="photoUrl" defaultValue={currentUser.photo}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
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
                            <option value="Dhaka">Dhaka</option>
                            <option value="Gazipur">Gazipur</option>
                            <option value="Gopalganj">Gopalganj</option>
                            <option value="Tangail">Tangail</option>
                            <option value="Pabna">Pabna</option>
                            <option value="Bogra">Bogra</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Sylhet">Sylhet</option>
                            <option value="Comilla">Comilla</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Upazila</label>
                        <select name="upazila"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option selected value={`${currentUser.upazila}`} disabled>{currentUser.upazila}</option>
                            <option value="Dhamrai">Dhamrai</option>
                            <option value="Savar">Savar</option>
                            <option value="Dohar">Dohar</option>
                            <option value="Gazipur Sadar">Gazipur Sadar</option>
                            <option value="Gopalganj Sadar">Gopalganj Sadar</option>
                            <option value="Tangail Sadar">Tangail Sadar</option>
                            <option value="Pabna Sadar">Pabna Sadar</option>
                            <option value="Bogra Sadar">Bogra Sadar</option>
                            <option value="Rangpur Sadar">Rangpur Sadar</option>
                            <option value="Barisal Sadar">Barisal Sadar</option>
                            <option value="Sylhet Sadar">Sylhet Sadar</option>
                            <option value="Comilla Sadar">Comilla Sadar</option>
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