import SectionTitle from "../../SectionTitle/SectionTitle";
import useCamps from "../../../Hooks/useCamps";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import "./manageCamp.css"
import { Link } from "react-router-dom";

const ManageCamp = () => {
  const [camps] = useCamps();
  console.log(camps)
  return (
    <div className="px-10">
      <SectionTitle
        heading={"Manage All Camps"}
        subHeading={"Manage Camps"}
      ></SectionTitle>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Fees</th>
        <th>Dr.</th>
        <th>Edit</th>
        <th>delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        camps.map((camp, idx)=> <tr key={camp._id}>
        <th>{idx + 1}</th>
        <td>{camp?.camp_name}</td>
        <td>{camp?.fees}$</td>
        <td>{camp?.health_care_professional_name}</td>
        <td>
            <Link to={`/dashboard/updateCamp/${camp._id}`}><p  className="text-xl text-blue-400"><FaPen></FaPen></p></Link>
        </td>
        <td>
            <p className="text-xl text-red-600"><MdDeleteOutline /></p>
        </td>
      </tr> )
      }
    </tbody>
  </table>
</div>
    </div>
  );
};

export default ManageCamp;
