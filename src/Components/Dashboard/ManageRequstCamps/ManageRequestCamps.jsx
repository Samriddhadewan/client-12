import React from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAllRequests from "../../../Hooks/useAllRequests";
import { FaTrash } from "react-icons/fa";
import { TbTrashOff } from "react-icons/tb";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageRequestCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [data, refetch] = useAllRequests();
  const handleConfirm = async (item) => {
    if (item.payment_status === "unpaid") {
      toast.error("Cannot confirm. Payment is still unpaid.");
      return;
    }
    axiosSecure.patch(`/request-confirm/${item?._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Request Confirm Success");
      }
    });
  };
  const handleDelete = async (item) => {
    console.log(item)
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
        axiosSecure.delete(`/request-delete/admin/${item._id}?campId=${item?.camp_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success("successfully deleted the request");
          }
        });
      }
    });
  };

  return (
    <div className="px-6">
      <SectionTitle
        subHeading={"Manage Request Camps"}
        heading={"Manage Request Camps"}
      ></SectionTitle>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camp Fee</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>{item?.participant_name}</td>
                <td>{item?.camp_name}</td>
                <td>{item?.fees}$</td>
                <td>
                  {item?.payment_status === "paid" ? (
                    <>
                      <p className="text-green-500">{item?.payment_status}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-500">{item?.payment_status}</p>
                    </>
                  )}
                </td>
                <td>
                  {item?.confirmation_status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleConfirm(item)}
                        className="btn "
                      >
                        {item?.confirmation_status}
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-green-400">
                        {item?.confirmation_status}
                      </p>
                    </>
                  )}
                </td>
                <td>
                  {item?.payment_status === "paid" ? (
                    <>
                      <p onClick={()=>toast.error("You already confirmed the request,can't delete!")} className="text-red-600 text-xl">
                        <TbTrashOff />
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => handleDelete(item)}
                        className="text-xl text-red-600"
                      >
                        <FaTrash></FaTrash>
                      </p>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequestCamps;
