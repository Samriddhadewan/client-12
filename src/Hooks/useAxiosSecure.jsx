import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://server-12-psi.vercel.app",
});
const useAxiosSecure = () => {
  const {handleUserLogout} = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    function(config){
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error){
      return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use( function(res){
      return res;
    }, function(error){
      const status = error.response.status;
      if(status === 401 || status === 403){
        handleUserLogout()
        .then(()=>{
          navigate("/login")
        })
        console.log("Unauthorized or Forbidden request", status);
        return Promise.reject(error)
      }})




  return axiosSecure;
};
export default useAxiosSecure;;
