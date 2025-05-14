import { useEffect, useState } from "react";
import CampCard from "../../Components/CampCard/CampCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllCamps = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [camps, setCamps] = useState([]);
  useEffect(() => {
    const fetchedData = async () => {
      const { data } = await axiosPublic.get(`/camps?search=${search}`);
      setCamps(data);
    };
    fetchedData();
  }, [axiosPublic, search]);
  return (
    <div>
      <div className="max-w-[80%] mx-auto min-h-[60vh]">
        {/* search bar here  */}
        <div className="flex mt-8 justify-center items-center">
          <div className=" ">
            <label className="input ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                required
                placeholder="Search Camps here"
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {camps.length > 0 ? (
            camps.map((camp) => <CampCard key={camp._id} camps={camp} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCamps;
