import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useMyRequest = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data=[],refetch}= useQuery({
        queryKey: ['myRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user?.email}`);
            return res.data;
        }
    })
  return [data,refetch]
}

export default useMyRequest