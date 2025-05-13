import React from "react";
import useTopEvents from "../../Hooks/useTopEvents";
import CampCard from "../CampCard/CampCard";
import { Link } from "react-router-dom";

const TopCamps = () => {
  const [data] = useTopEvents();
  console.log(data);
  return (
    <div className="mt-15">
      <h1 className="text-2xl font-semibold text-center ">Top Camps</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data.map((camp, idx) => (
          <CampCard key={idx} camps={camp}></CampCard>
        ))}
      </div>
      <Link to="/allCamps">
        <div className="w-full mt-7 flex justify-center">
        <button className="btn bg-[#0E7A81] text-white">View All Camps</button>
        </div>
      </Link>
    </div>
  );
};

export default TopCamps;
