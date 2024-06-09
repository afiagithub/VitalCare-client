import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiTwitter } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import PropTypes from 'prop-types';

const SingleDoctorCard = ({ doc }) => {
    const { name, email, fb_address, twitter, area_of_expertise, degrees, phone, years_of_expertise, image } = doc;
    return (
        <div className="w-80 p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
            <img src={image} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
            <div className="mt-6 mb-2">
                <span className="block text-xs font-bold tracking-widest uppercase 
                dark:text-blue-600">{area_of_expertise}</span>
                <h2 className="text-xl font-semibold tracking-wide">{name}</h2>
            </div>
            <hr className="mb-5 mt-3"/>
            <p className="font-semibold">Degrees: <span className="text-[#2D3663]">{degrees}</span></p>
            <p className="font-semibold">Years of Experience: <span className="text-[#2D3663]">{years_of_expertise}</span></p>
            <p className="font-semibold">Phone: <span className="text-[#2D3663]">{phone}</span></p>
            <div className="flex flex-row gap-4 items-center justify-around py-3 px-4 
            bg-blue-300 text-xl mt-5 rounded-xl">
                <div className="tooltip" data-tip={email}>
                    <MdOutlineMarkEmailRead />
                </div>
                <div className="tooltip" data-tip={twitter}>
                    <FiTwitter />
                </div>
                <div className="tooltip" data-tip={fb_address}>
                    <LuFacebook />
                </div>
            </div>
        </div>
    );
};

SingleDoctorCard.propTypes = {
    doc: PropTypes.object,
    name: PropTypes.string,
    email: PropTypes.string,
    fb_address: PropTypes.string,
    twitter: PropTypes.string,
    area_of_expertise: PropTypes.string,
    degrees: PropTypes.string,
    phone: PropTypes.string,
    years_of_expertise: PropTypes.number,
    image: PropTypes.string,
}

export default SingleDoctorCard;