import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import useGetStat from '../../../Hooks/useGetStat';

const UserAnalytics = () => {
  const [data] = useGetStat();
  

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <SectionTitle
        subHeading={'Your all data is here'}
        heading={'USER ANALYTICS'}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-100 text-blue-900 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Requests</h3>
          <p className="text-3xl font-bold mt-2">{data?.totalRequests}</p>
        </div>

        <div className="bg-green-100 text-green-900 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Payments</h3>
          <p className="text-3xl font-bold mt-2">{data?.totalPayments}</p>
        </div>

        <div className="bg-purple-100 text-purple-900 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Reviews</h3>
          <p className="text-3xl font-bold mt-2">{data?.totalReviews}</p>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
