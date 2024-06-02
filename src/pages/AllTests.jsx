import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SingleTestCard from "../components/SingleTestCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AllTests = () => {
    const axiosPublic = useAxiosPublic()
    const { data: tests = [], isLoading } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tests')
            return res.data;
        }
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="my-5 md:my-8 lg:my-12">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Explore Our Diagnostic Services</h1>
            <p className="w-3/5 mx-auto text-center text-sm font-semibold mb-5 lg:mb-10">Examine our broad array of 
                diagnostic tests available to address all your health concerns. 
                Utilizing the latest technology and techniques, our diagnostic center ensures that 
                you receive high-quality, accurate results promptly. Find the test you need today.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    tests.map(test => <SingleTestCard key={test._id} test={test}></SingleTestCard>)
                }
            </div>
        </div>
    );
};

export default AllTests;