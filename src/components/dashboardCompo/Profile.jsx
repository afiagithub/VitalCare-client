import UpdateProfile from "./UpdateProfile";
import getUser from "../../hooks/getUser";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../shared/LoadingSpinner";
import PropTypes from 'prop-types';

const Profile = () => {
    const [currentUser, isLoading] = getUser();
    const {name, email, photo, bloodType, dist, upazila, status} = currentUser;
    if(isLoading){
        <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="w-full mt-6 md:mt-8 lg:mt-10 flex flex-col lg:flex-row justify-between px-10 md:px-0">
            <Helmet>
                <title>VitalCare | My Profile</title>
            </Helmet>
            <div className="lg:w-1/2 text-center mb-5 lg:mb-0">
                <img className="w-32 h-32 rounded-full mx-auto object-center" src={photo} alt="" />
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
            <hr className="lg:hidden border-[#2D3663] mr-4 mb-5" />
            <hr className="lg:hidden border-[#2D3663] mr-4" />
            <div className="lg:w-1/2 text-center">
                <UpdateProfile></UpdateProfile>
            </div>
        </div>
    );
};

Profile.propTypes = {
    data: PropTypes.object,
    name: PropTypes.string,
    photo: PropTypes.string,
    bloodType: PropTypes.string,
    dist: PropTypes.string,
    upazila: PropTypes.string,
    status: PropTypes.string
}

export default Profile;