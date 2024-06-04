import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useDistrict = () => {
    const axiosPublic = useAxiosPublic();
    const { data: districtData = [], isLoading: distLoading } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts')
            return res.data
            
        }
    })
    return [districtData, distLoading]
};

export default useDistrict;