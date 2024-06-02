import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDate = ({newDate}) => {
    const axiosPublic = useAxiosPublic();
    const { data: filteredTests = [], isLoading } = useQuery({
        queryKey: ['filteredTests', newDate],
        queryFn: async () => {
            const res = await axiosPublic.get(`/filter-tests/${newDate}`)
            return res.data
        }
    })
    return [filteredTests, isLoading]
};

export default useDate;