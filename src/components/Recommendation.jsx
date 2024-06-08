import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Navigation, Pagination } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./shared/LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Recommendation = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();    
    const { data: tips = {}, isLoading } = useQuery({
        queryKey: ['tips'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/recommend/${user.email}`)
            console.log(res.data);
            return res.data
        },
        refetchOnWindowFocus: false,
    })
    if(!user){
        return '';
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <h1 className="font-ubuntu text-4xl font-bold text-center mt-5 md:mt-8 lg:mt-10 mb-5">
                Personalized Health Recommendations</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-10">                
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
                <SwiperSlide className="text-center p-4 mb-10">
                    <h2 className="text-2xl font-bold my-4">Health Tips</h2>
                    <p className="font-semibold text-[#2D3663]">{tips.healthTips}</p>
                </SwiperSlide>
                <SwiperSlide className="text-center p-4">
                    <h2 className="text-2xl font-bold my-4">Preventive Measures</h2>
                    <p className="font-semibold text-[#2D3663]">{tips.preventiveMeasures}</p>
                </SwiperSlide>
                <SwiperSlide className="text-center p-4">
                    <h2 className="text-2xl font-bold my-4">Tests Suggested</h2>
                    <p className="font-semibold text-[#2D3663]">{tips.upcomingTestsSuggested}</p>
                </SwiperSlide>
                <SwiperSlide className="text-center p-4">
                    <h2 className="text-2xl font-bold my-4">Food Habits</h2>
                    <p className="font-semibold text-[#2D3663]">{tips.foodHabits}</p>
                </SwiperSlide>
                <SwiperSlide className="text-center p-4">
                    <h2 className="text-2xl font-bold my-4">Suggested Exercise</h2>
                    <p className="font-semibold text-[#2D3663]">{tips.exerciseToPractice}</p>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Recommendation;