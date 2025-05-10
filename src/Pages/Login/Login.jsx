import { Link, useNavigate } from "react-router-dom"
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin"
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
  const {HandleUserLogin} = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
    HandleUserLogin(data.email, data.password)
      .then((result) => {
        console.log("from the loginPage", result.user);
        toast.success("User logged in successfully");
        navigate("/");
        // Handle successful login here
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Handle login error here
      });
  };



  return (
     <div>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="card bg-base-100 w-full max-w-xl p-14 shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}
           className="">
            <h1 className="text-4xl text-center font-bold">Login Now</h1>
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
              <button className="btn bg-[#07332F] text-white mt-4">
                Login
              </button>
            </fieldset>
          </form>
          <GoogleLogin></GoogleLogin>
          <h1 className="pt-4">
            Don't have an Account?{" "}
            <Link className="underline text-blue-800" to="/register">
              Register now
            </Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Login