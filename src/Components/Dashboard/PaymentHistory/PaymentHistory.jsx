import React from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import usePaymentHistory from "../../../Hooks/usePaymentHistory";

const PaymentHistory = () => {
  const [data] = usePaymentHistory();
  console.log(data);
  return (
    <div className="px-6">
      <SectionTitle
        subHeading={"ALL THE PAYMENTS"}
        heading={"PAYMENT HISTORY"}
      ></SectionTitle>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Camp Name</th>
              <th>transaction Id</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item?._key}>
                <th>{idx+1}</th>
                <td>{item?.camp_name}</td>
                <td>{item?.transaction_id}</td>
                <td>{item?.paid_amount}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
