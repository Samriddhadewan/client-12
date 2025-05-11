import SectionTitle from "../../SectionTitle/SectionTitle";
import useCamps from "../../../Hooks/useCamps";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import "./manageCamp.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [camps,refetch] = useCamps();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/camps/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("Deleted successfully");
          }
        });
      }
    });
  };
  console.log(camps);
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
            {camps.map((camp, idx) => (
              <tr key={camp._id}>
                <th>{idx + 1}</th>
                <td>{camp?.camp_name}</td>
                <td>{camp?.fees}$</td>
                <td>{camp?.health_care_professional_name}</td>
                <td>
                  <Link to={`/dashboard/updateCamp/${camp._id}`}>
                    <p className="text-xl text-blue-400">
                      <FaPen></FaPen>
                    </p>
                  </Link>
                </td>
                <td>
                  <p
                    onClick={() => {
                      handleDelete(camp._id);
                    }}
                    className="text-xl text-red-600"
                  >
                    <MdDeleteOutline />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;
