import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpazilla = () => {
    const axiosPublic = useAxiosPublic();
    const { data: upazilaData = [], isLoading: upzilaLoad } = useQuery({
        queryKey: ['upazila'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazilas')
            return res.data
        }
    })
    return [upazilaData, upzilaLoad]
};

export default useUpazilla;