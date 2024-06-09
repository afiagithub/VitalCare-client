import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Navigation, Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./shared/LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";
import tipImg from "../../public/tips.png"
import preventImg from "../../public/quarantine.png"
import testImg from "../../public/tests.png"

const Recommendation = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tips = {}, isLoading } = useQuery({
        queryKey: ['tips'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recommend')
            return res.data
        },
        refetchOnWindowFocus: false,
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <h1 className="font-ubuntu text-4xl font-bold text-center mt-5 md:mt-8 lg:mt-10 mb-5">
                Personalized Health Recommendations</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-12">
                Our personalized recommendations include valuable health tips, preventive measures,
                suggested tests, dietary advice, and exercise routines. Stay proactive about your health with guidance
                that's specifically designed for you.</p>
            <Swiper
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Pagination]}
                className="swiper-container"
            >
                {
                    tips.map(tip => <SwiperSlide key={tip._id} 
                    className="text-center p-4 mb-10 shadow-lg rounded-xl">
                        <div className="flex flex-row gap-2 justify-center items-center">
                            <img className="w-8 mx-auto" src={tipImg} alt="" />
                            <h2 className="text-lg font-bold my-4 text-left">Health Tips:
                                <span className="text-base font-semibold text-[#2D3663]"> {tip.healthTips}</span></h2>
                        </div>

                        <div className="flex flex-row gap-2 justify-center items-center">
                            <img className="w-12 mx-auto" src={preventImg} alt="" />
                            <h2 className="text-lg font-bold my-4 text-left">Preventive Measures:
                                <span className="text-base font-semibold text-[#2D3663]"> {tip.preventiveMeasures}</span>
                            </h2>
                        </div>

                        <div className="flex flex-row gap-2 justify-center items-center">
                            <img className="w-12 mx-auto" src={testImg} alt="" />
                            <h2 className="text-lg font-bold my-4 text-left">Tests Suggested:
                                <span className="text-base font-semibold text-[#2D3663]"> {tip.upcomingTestsSuggested}</span>
                            </h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Recommendation;