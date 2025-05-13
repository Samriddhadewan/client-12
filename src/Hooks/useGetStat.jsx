import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetStat = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = [] } = useQuery({
    queryKey: ["user-stat", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
  });
  return [data];
};

export default useGetStat;
