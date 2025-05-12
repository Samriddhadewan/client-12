import React from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import useAllRequests from "../../../Hooks/useAllRequests";
import { FaTrash } from "react-icons/fa";

const ManageRequestCamps = () => {
  const [data] = useAllRequests();

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
                <td>{item?.payment_status}</td>
                <td>{item?.confirmation_status}</td>
                <td>
                  <p className="text-xl text-red-600">
                    <FaTrash></FaTrash>
                  </p>
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
