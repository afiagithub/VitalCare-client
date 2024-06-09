import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "./shared/LoadingSpinner";


const FeaturedTests = () => {
    const axiosPublic = useAxiosPublic();
    const { data: featured = [], isLoading } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top-tests')
            return res.data
        },
        refetchOnWindowFocus: false,
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <h1 className="font-ubuntu text-4xl font-bold text-center mt-5 md:mt-8 lg:mt-10 mb-5">Featured Tests</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-10">
                Discover our selection of featured diagnostic tests designed to provide comprehensive insights
                into your health. These tests are curated by our team of experts to address the most critical
                aspects of wellness and disease prevention.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
                {
                    featured.map(test => <div key={test._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img className="h-64" src={test.image} alt="test" /></figure>
                        <div className="card-body">
                            <h2 className="card-title h-14">{test.title}</h2>
                            <div className="flex flex-row items-center justify-between font-bold">
                                <p>Date: <span className="text-[#20B2AA]">{test.date}</span></p>
                                <p>Price: <span className="text-[#20B2AA]">{test.cost}</span></p>
                            </div>
                            <div className="card-actions justify-end mt-5">
                                <Link to={`/test-details/${test._id}`} className="btn bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                                hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] w-full text-lg">View Details</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default FeaturedTests;