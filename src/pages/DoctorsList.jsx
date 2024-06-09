import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SingleDoctorCard from "../components/SingleDoctorCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";


const DoctorsList = () => {
    const axiosPublic = useAxiosPublic();
    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/doctors')
            return res.data;
        },
        refetchOnWindowFocus: false,
    })
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <Helmet>
                <title>VitalCare | Doctors</title>
            </Helmet>
            <h1 className="font-ubuntu text-4xl font-bold text-center mt-5 md:mt-8 lg:mt-10 mb-5">
                Our Expert Medical Team</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-10">
                Meet the dedicated and experienced healthcare professionals at VitalCare.
                Our team of specialists is committed to providing top-quality care and personalized treatment
                to meet your health needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                {
                    doctors.map(doc => <SingleDoctorCard key={doc._id} doc={doc}></SingleDoctorCard>)
                }
            </div>
        </div>
    );
};

export default DoctorsList;