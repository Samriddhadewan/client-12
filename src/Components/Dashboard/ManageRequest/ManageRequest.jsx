import { FaTrash } from "react-icons/fa";
import useMyRequest from "../../../Hooks/useMyRequest";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LuMessageSquareOff } from "react-icons/lu";

const ManageRequest = () => {
  const [data] = useMyRequest();
  console.log(data);
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
                <td>{request?.confirmation_status}</td>
                <td>
                  <p className="text-xl text-red-500">
                    <FaTrash></FaTrash>
                  </p>
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
