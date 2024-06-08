import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SingleTestCard = ({ test }) => {
    const {_id, image, date, slots, title, short_description } = test;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img className="h-64" src={image} alt="test" /></figure>
            <div className="card-body">
                <h2 className="card-title h-14">{title}</h2>
                <p className="text-sm">{short_description.slice(0, 80)}...</p>
                <div className="flex flex-row items-center justify-between font-bold">
                    <p>Date: <span className="text-[#20B2AA]">{date}</span></p>
                    <p>Slot Left: <span className="text-[#20B2AA]">{slots}</span></p>
                </div>
                <div className="card-actions justify-end mt-5">
                    <Link to={`/test-details/${_id}`} className="btn bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                    hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] w-full text-lg">View Details</Link>
                </div>
            </div>
        </div>
    );
};

SingleTestCard.propTypes = {
    test: PropTypes.object,
    date: PropTypes.string,
    image: PropTypes.string,
    slots: PropTypes.string,
    title: PropTypes.string,
    short_description: PropTypes.string
}

export default SingleTestCard;