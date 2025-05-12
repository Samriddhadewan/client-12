import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { data = [] , refetch} = useQuery({
    queryKey: ["allRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });
  return [data, refetch];
};

export default useAllRequests;
