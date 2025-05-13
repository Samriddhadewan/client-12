import { FaTrash } from "react-icons/fa";
import useMyRequest from "../../../Hooks/useMyRequest";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LuMessageSquareOff } from "react-icons/lu";
import { TbTrashOff } from "react-icons/tb";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [data, refetch] = useMyRequest();
  const handleDelete = (item) => {
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
        axiosSecure
          .delete(`/request-delete/user/${item?._id}?campId=${item?.camp_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              toast.success("request deleted Successfully");
            }
          });
      }
    });
  };
  return (
    <div className="px-6">
      <SectionTitle
        heading={`Manage Requests`}
        subHeading={`Manage Requests`}
      ></SectionTitle>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Camp Name</th>
              <th>Camp fees</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
              <th>FeedBack</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, idx) => (
              <tr key={request._id}>
                <th>{idx + 1}</th>
                <td>{request?.camp_name}</td>
                <td>{request?.fees}$</td>
                <td>{request?.participant_name}</td>
                <td>
                  {request?.payment_status === "unpaid" ? (
                    <>
                      <Link to={`/dashboard/payment`} state={{ request }}>
                        <button className="btn">Pay</button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-green-400">
                        {request?.payment_status}
                      </p>
                    </>
                  )}
                </td>
                <td>
                  {request?.confirmation_status === "pending" ? (
                    <>
                      <p className="text-red-500">
                        {request?.confirmation_status}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-500">
                        {request?.confirmation_status}
                      </p>
                    </>
                  )}
                </td>
                <td>
                  {request?.payment_status === "paid" ? (
                    <>
                      <p onClick={()=> toast.error("You already paid for the camp, Can't delete!")} className="text-xl text-red-500">{<TbTrashOff />}</p>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => handleDelete(request)}
                        className="text-xl text-red-500"
                      >
                        <FaTrash></FaTrash>
                      </p>
                    </>
                  )}
                </td>
                <td>
                  {request?.confirmation_status === "confirmed" ? (
                    <>
                      <p>
                        <p className="text-xl text-green-400">
                          <FaMessage></FaMessage>
                        </p>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl text-red-700 ">
                        <LuMessageSquareOff></LuMessageSquareOff>
                      </p>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequest;
