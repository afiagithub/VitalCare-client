import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUser = (id) => {
    const axiosPublic = useAxiosPublic();
    const { data: currentUser = {}, isLoading, refetch } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allUsers/${id}`)
            return res.data
        }
    })
    return [currentUser, isLoading, refetch]
};

export default useUser;