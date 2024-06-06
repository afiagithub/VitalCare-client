import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useBlocked = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {data: isBlocked, isPending: isUserLoading} = useQuery({
        queryKey: [user?.email, 'isBlocked'],
        queryFn: async() => {
            const res =  await axiosPublic(`/userlist/blocked/${user.email}`);
            console.log(res.data);
            return res.data?.blocked;
        }
    })
    return [isBlocked, isUserLoading]
};

export default useBlocked;