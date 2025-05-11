import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

const useCamps = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch,data:camps=[]}=  useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camps`);
            return res.data;
        }
        
    })
    return [camps,refetch];
}

export default useCamps