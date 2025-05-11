import CampCard from "../../Components/CampCard/CampCard";
import useCamps from "../../Hooks/useCamps";

const AllCamps = () => {
  const [camps] = useCamps();
  console.log(camps);
  return (
    <div>
      <div className="max-w-[80%] mx-auto">
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
              //   onChange={(e)=> setSearch(e.target.value)}
              type="search"
              required
              placeholder="Search Camps here"
            />
          </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {
            camps.map((camps)=> <CampCard key={camps._id} camps={camps}></CampCard>)
        }
        </div>
      </div>
    </div>
  );
};

export default AllCamps;
