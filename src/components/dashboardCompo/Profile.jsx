import UpdateProfile from "./UpdateProfile";
import getUser from "../../hooks/getUser";


const Profile = () => {
    const [currentUser, isLoading] = getUser();
    const {name, email, photo, bloodType, dist, upazila, status} = currentUser;
    if(isLoading){
        <div className="text-center flex flex-col items-center justify-center h-[100vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    }
    return (
        <div className="lg:w-full mt-6 md:mt-8 lg:mt-10 flex flex-col lg:flex-row justify-between">
            <div className="w-1/2 text-center">
                <img className="rounded-full mx-auto" src={photo} alt="" />
                <h2 className="text-2xl font-bold my-5">Welcome, {name}</h2>
                <div className="text-left ml-6 md:ml-10 lg:ml-12">
                    <p className="my-5 text-xl font-bold">User Information: </p>
                    <p className="font-bold">Email: <span className="text-[#20B2AA]">{email}</span></p>
                    <p className="font-bold">Blood Type: <span className="text-[#20B2AA]">{bloodType}</span></p>
                    <p className="font-bold">District: <span className="text-[#20B2AA]">{dist}</span></p>
                    <p className="font-bold">Upazila: <span className="text-[#20B2AA]">{upazila}</span></p>
                    <p className="font-bold">Status: <span className="text-[#20B2AA]">{status}</span></p>
                </div>
            </div>
            <div className="lg:w-1/2 text-center">
                <UpdateProfile></UpdateProfile>
            </div>
        </div>
    );
};

export default Profile;