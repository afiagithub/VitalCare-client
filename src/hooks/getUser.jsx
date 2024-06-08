import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const getUser = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: currentUser = {}, isLoading, refetch } = useQuery({
        queryKey: ['user', user.uid],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        }
    })
    return [currentUser, isLoading, refetch]
};

export default getUser;