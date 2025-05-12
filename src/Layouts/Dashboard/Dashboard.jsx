import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    console.log(isAdmin)
  return (
    <div>
      <div className="max-w-[1140px] mx-auto">
        <Navbar></Navbar>
      </div>
      <div className="flex max-w-[1140px] mx-auto">
        <div className="w-1/4 bg-[#78a9a5] min-h-screen">
          <div className="flex flex-col gap-2 p-5">
            <h1 className="text-white text-2xl font-bold">Dashboard</h1>
            {isAdmin ? (
              <>
                <ul className="flex flex-col gap-2">
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/adminProfile">
                      Organizer Profile
                    </NavLink>
                  </li>
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/addCamp">Add A Camp</NavLink>
                  </li>
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/manageCamp">Manage Camps</NavLink>
                  </li>
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/manageRequestCamp">
                      Manage Registered Camps

                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="flex flex-col gap-2">
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/userProfile">User Profile</NavLink>
                  </li>
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/analytics">Analytics</NavLink>
                  </li>
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/manageRequests">Registered Camps</NavLink>
                  </li>
                  <li className="text-white text-lg font-semibold">
                    <NavLink to="/dashboard/paymentHistory">
                      Payment History
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 bg-[#F4F4F4]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
