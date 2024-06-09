import "../custom.css"
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./shared/LoadingSpinner";
import { Link } from "react-router-dom";

const Banner = () => {
    const axiosPublic = useAxiosPublic();
    const { data: banner = {}, isLoading } = useQuery({
        queryKey: ['banners', 'active'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banner')
            return res.data
        },
        refetchOnWindowFocus: false,
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="slider flex flex-col items-center justify-center text-center rounded-xl 
        bg-no-repeat bg-cover bg-fixed bg-center lg:bg-top"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(45, 54, 99, 0.4), rgba(0, 0, 0, 0.6)), url(${banner.image})` }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold 
            w-4/5 lg:w-3/5 capitalize text-[#00BFBF] font-ubuntu">{banner.coupon_rate}% {banner.heading}
            </h1>
            <p className="text-xl font-ubuntu text-white font-bold">Use Code:  
            <span className="text-[#47CCC8]"> {banner.coupon_code_name}</span></p>
            <p className="text-white my-5 w-4/5 lg:w-3/5 font-semibold">{banner.short_description}</p>
            <Link to='/all-tests' className="btn text-lg lg:mt-5 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8]">Book Now</Link>
        </div>
    );
};

export default Banner;