import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useDistrict from "../hooks/useDistrict";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useUpazilla from "../hooks/useUpazilla";

const Register = () => {
    const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

    const { createUser, updateUserProfile, setUser } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [districtData, distLoading] = useDistrict();
    const [upazilaData, upzilaLoad] = useUpazilla();

    const [show, setShow] = useState(false);
    const handleToggle = () => {
        setShow(!show);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { fullName, email, pass, confirmPass, photo, bloodType, dist, upazila } = data;
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data)
        if (res.data.success) {
            const photoURL = res.data.data.display_url;
            if (pass.length < 6) {
                toast.error("Password must be at least 6 characters long");
                return;
            }
            else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(pass)) {
                toast.error("Password must have a uppercase and a lowercase letter");
                return;
            }
            else if (pass !== confirmPass) {
                toast.error("Password does not match Confirm Password");
                return;
            }
            createUser(email, pass)
                .then((result) => {
                    updateUserProfile(fullName, photoURL)
                        .then(async () => {
                            console.log(result.user);
                            setUser({ ...result.user, photoURL: photoURL, displayName: fullName })

                            const userInfo = {
                                name: fullName,
                                email,
                                user_id: result.user.uid,
                                photo: photoURL,
                                bloodType,
                                dist,
                                upazila,
                                status: 'active'
                            }
                            const res = await axiosPublic.post("/users", userInfo);
                            console.log(res);
                            if (res.data.insertedId) {
                                navigate('/')
                                toast.success("Successfully Registered")
                            }
                        });
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }

    }
    if(distLoading || upzilaLoad){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md sm:p-10 mb-10">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold text-primary">Register</h1>
                <p className="text-sm dark:text-secondary">Create your account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Full Name</label>
                        <input type="text" name="name" placeholder="Leroy Jenkins" {...register("fullName")}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" placeholder="leroy@jenkins.com" {...register("email", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="block mb-2 text-sm">Photo URL</label>
                        <input type="file" name="photo" {...register("photo")}
                            className="file-input file-input-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />

                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Blood Group</label>
                        <select name="bloodType" {...register("bloodType")} defaultValue='default'
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option value="default" disabled>Your Blood Type</option>
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
                        <select name="dist" {...register("dist")} defaultValue='default'
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option value="default" disabled>Your District</option>
                            {
                                districtData.map(district => 
                                <option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Upazila</label>
                        <select name="upazila" {...register("upazila")} defaultValue='default'
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option value="default" disabled>Your Upazila</option>
                            {
                                upazilaData.map(upazila => 
                                <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="relative">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm">Password</label>
                        </div>
                        <input type={show ? "text" : "password"} name="password" id="password" placeholder="*****" {...register("pass", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        <div className="absolute top-10 right-4 text-lg" onClick={handleToggle}>
                            {show ? <FaEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>
                    {errors.pass && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm">Confirm Password</label>
                        </div>
                        <input type="password" name="password" id="con-password" placeholder="*****" {...register("confirmPass", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.confirmPass && <span className="text-red-700 font-semibold">This field is required</span>}
                </div>
                <div className="space-y-2">
                    <div>
                        <input type="submit" value="Sign Up"
                            className="w-full px-8 py-3 bg-[#ff494a] text-white text-lg font-semibold rounded-xl 
                            border-2 border-[#ff494a] hover:border-[#ff494a] hover:bg-transparent 
                            hover:text-[#ff494a]" />
                    </div>
                    <p className="px-6 text-sm text-center dark:text-secondary">Already have an account?
                        <Link to="/login" className="hover:underline dark:text-[#ff494a] font-bold">
                            Sign in</Link>.
                    </p>
                </div>
            </form>

        </div>
    );
};

export default Register;