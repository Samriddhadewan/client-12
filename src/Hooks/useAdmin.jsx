import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user,loading} = useAuth();

    const {data: isAdmin, isPending:isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin;
        }
    })
  return (
    [isAdmin, isAdminLoading]
  )
}

export default useAdmin