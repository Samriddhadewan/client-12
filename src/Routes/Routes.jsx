import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import PrivateRoute from "../Routes/PrivateRoute"
import UserProfile from "../Components/Dashboard/UserProfile/UserProfile";
import AdminRoutes from "./AdminRoutes";
import AdminProfile from "../Components/Dashboard/AdminProfile/AdminProfile";
import AddCamp from "../Components/Dashboard/AddCamp/AddCamp";
import ManageCamp from "../Components/Dashboard/ManageCamp/ManageCamp";
import UpdateCamp from "../Components/Dashboard/UpdateCamp/UpdateCamp";
import AllCamps from "../Pages/AllCamps/AllCamps";
import CampDetails from "../Pages/CampDetails/CampDetails";
import ManageRequest from "../Components/Dashboard/ManageRequest/ManageRequest";
import ManageRequestCamps from "../Components/Dashboard/ManageRequstCamps/ManageRequestCamps";
import Payment from "../Components/Dashboard/Payment/Payment";
import PaymentHistory from "../Components/Dashboard/PaymentHistory/PaymentHistory";
import Feedback from "../Pages/Feedback/Feedback";
import UserAnalytics from "../Components/Dashboard/UserAnalytics/UserAnalytics";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"/register",
            element:<Register></Register>
        },
        {
            path:"/allCamps",
            element:<AllCamps></AllCamps>
        },
        {
            path:"/camp/:id",
            element:<PrivateRoute><CampDetails></CampDetails></PrivateRoute>,
            loader: ({params}) => fetch(`https://server-12-psi.vercel.app/camps/${params.id}`)
        },
    ],
  },
  {
    path:"dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      // user links 
      {
        path:"userProfile",
        element:<PrivateRoute><UserProfile></UserProfile> </PrivateRoute>,
      },
      {
        path:"userAnalytics",
        element:<PrivateRoute><UserAnalytics></UserAnalytics> </PrivateRoute>,
      },
      {
        path:"payment",
        element:<PrivateRoute><Payment></Payment> </PrivateRoute>,
      },
      {
        path:"manageRequests",
        element:<PrivateRoute><ManageRequest></ManageRequest> </PrivateRoute>,
      },
      {
        path:"feedback",
        element:<PrivateRoute><Feedback></Feedback></PrivateRoute>,
      },
      {
        path:"paymentHistory",
        element:<PrivateRoute><PaymentHistory></PaymentHistory> </PrivateRoute>,
      },





      // admin links 
      {
        path:"adminProfile",
        element:<AdminRoutes> <AdminProfile></AdminProfile> </AdminRoutes>,
      },
      {
        path:"addCamp",
        element:<AdminRoutes> <AddCamp></AddCamp> </AdminRoutes>,
      },
      {
        path:"manageCamp",
        element:<AdminRoutes> <ManageCamp></ManageCamp> </AdminRoutes>,
      },
      {
        path:"manageRequestCamp",
        element:<AdminRoutes> <ManageRequestCamps></ManageRequestCamps> </AdminRoutes>,
      },
      {
        path:"updateCamp/:id",
        element:<AdminRoutes> <UpdateCamp></UpdateCamp> </AdminRoutes>,
        loader: ({params}) => fetch(`https://server-12-psi.vercel.app/camps/${params.id}`)
      },
    ]
  }
]);

export default router;
