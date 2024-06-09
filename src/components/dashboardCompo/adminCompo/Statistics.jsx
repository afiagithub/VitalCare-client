import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();
    const { data: stats = [], isLoading: statLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/totbooking')
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    const { data: ratios = [], isLoading: ratioLoading } = useQuery({
        queryKey: ['ratios'],
        queryFn: async () => {
            const res = await axiosSecure.get('/delivery-ratio')
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    if (statLoading || ratioLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <Helmet>
                <title>VitalCare | Statistics</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Statistics</h1>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0">
                <Barchart stats={stats}></Barchart>
                <Piechart ratios={ratios}></Piechart>
            </div>
        </div>
    );
};

export default Statistics;