import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "./useAxiosPublic";

const useTopEvents = () => {
  const axiosPublic = useAxiosPublic();
  const { data = [] } = useQuery({
    queryKey: ["top-camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-events");
      return res.data;
    },
  });
  return [data];
};

export default useTopEvents;
