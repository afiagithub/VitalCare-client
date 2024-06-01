import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Profile = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: currentUser = {}, isLoading } = useQuery({
        queryKey: ['user', user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`)
            return res.data
        }
    })
    const {name, email, bloodType, district, upazila, status} = currentUser;
    if(isLoading){
        <div className="text-center flex flex-col items-center justify-center h-[100vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    }
    return (
        <div className="w-full mt-6 md:mt-8 lg:mt-10">
            <div className="w-1/2 text-center">
                <img className="rounded-full mx-auto" src={user.photoURL} alt="" />
                <h2 className="text-2xl font-bold my-5">Welcome, {name}</h2>
                <div className="text-left ml-6 md:ml-10 lg:ml-12">
                    <p className="my-5 text-xl font-bold">User Information: </p>
                    <p className="font-bold">Email: <span className="text-[#20B2AA]">{email}</span></p>
                    <p className="font-bold">Blood Type: <span className="text-[#20B2AA]">{bloodType}</span></p>
                    <p className="font-bold">District: <span className="text-[#20B2AA]">{district}</span></p>
                    <p className="font-bold">Upazila: <span className="text-[#20B2AA]">{upazila}</span></p>
                    <p className="font-bold">Status: <span className="text-[#20B2AA]">{status}</span></p>
                </div>
            </div>

        </div>
    );
};

export default Profile;