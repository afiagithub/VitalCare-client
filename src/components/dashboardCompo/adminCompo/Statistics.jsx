import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../shared/LoadingSpinner";
import Barchart from "./Barchart";
import Piechart from "./Piechart";

const Statistics = () => {
    const axiosPublic = useAxiosPublic();
    const { data: stats = [], isLoading: statLoading, refetch } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/totbooking')
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    const { data: ratios = [], isLoading: ratioLoading } = useQuery({
        queryKey: ['ratios'],
        queryFn: async () => {
            const res = await axiosPublic.get('/delivery-ratio')
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    if (statLoading || ratioLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Statistics</h1>
            <div className="flex flex-row justify-between items-center">
                <Barchart stats={stats}></Barchart>
                <Piechart ratios={ratios}></Piechart>
            </div>
        </div>
    );
};

export default Statistics;