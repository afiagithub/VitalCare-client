import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const getUser = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data: currentUser = {}, isLoading, refetch } = useQuery({
        queryKey: ['user', user.uid],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.uid}`)
            return res.data
        }
    })
    return [currentUser, isLoading, refetch]
};

export default getUser;