import React from 'react'
import useAuth from '../../Hooks/useAuth'
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {handleGoogleLogin}= useAuth();
  const handleLogin = () => {
    handleGoogleLogin()
      .then((result) => {
        const userData = {
          email: result.user.email,
          name: result.user.displayName, 
        }
        axiosPublic.post('/users', userData)
          .then(() => {
          })
          navigate('/')
          toast.success("User logged in successfully");
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  }
  return (
    <div>
      <div className="divider my-1">OR</div>

      <button onClick={handleLogin} className="btn bg-[#4285F4] text-white w-full">
        GoogleLogin
      </button>
    </div>
  )
}

export default GoogleLogin