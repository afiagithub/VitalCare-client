import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';

const UserModal = ({ data }) => {
    const { name, email, photo, bloodType, dist, upazila, status } = data;
    return (
        <div className="text-center modal-box h-full pt-12">
            <img className="w-32 h-32 rounded-full mx-auto object-center" src={photo} alt="" />
            <h2 className="text-2xl font-bold my-5">{name}</h2>
            <div className="text-left ml-6 md:ml-10">
                <p className="my-5 text-xl font-bold">User Information: </p>
                <p className="font-bold">Email: <span className="text-[#20B2AA]">{email}</span></p>
                <p className="font-bold">Blood Type: <span className="text-[#20B2AA]">{bloodType}</span></p>
                <p className="font-bold">District: <span className="text-[#20B2AA]">{dist}</span></p>
                <p className="font-bold">Upazila: <span className="text-[#20B2AA]">{upazila}</span></p>
                <p className="font-bold">Status: <span className="text-[#20B2AA]">{status}</span></p>
            </div>
            <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn mr-5 bg-red-600 border-2 border-transparent text-white font-black text-xl 
                    hover:bg-transparent hover:border-red-600 hover:text-red-600"><IoMdClose /></button>
                </form>
            </div>
        </div>
    );
};

UserModal.propTypes = {
    data: PropTypes.object,
    name: PropTypes.string,
    photo: PropTypes.string,
    bloodType: PropTypes.string,
    dist: PropTypes.string,
    upazila: PropTypes.string,
    status: PropTypes.string
}

export default UserModal;