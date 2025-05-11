import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

const useCamps = () => {
    const axiosSecure = useAxiosSecure();
    const {data:camps=[]}=  useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/camps`);
            return res.data;
        }
        
    })
    return [camps];
}

export default useCamps