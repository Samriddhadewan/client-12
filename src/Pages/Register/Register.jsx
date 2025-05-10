import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, handleUpdateUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      console.log("from the result", result.user);
      handleUpdateUser(data.name, data.photo).then(() => {
        console.log("User updated successfully");
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("Successfully Created User");
            navigate("/");
          }
        });
      });
    });
  };

  return (
    <div>
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="card bg-base-100 w-full max-w-xl p-14 shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <h1 className="text-3xl text-center font-bold">Register Now</h1>
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}

              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Enter your Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <label className="fieldset-label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input w-full"
                placeholder="Enter Photo URL"
                {...register("photo", { required: "PhotoURL is required" })}
              />
              {errors.photo && (
                <p className="text-red-500">{errors.photo.message}</p>
              )}
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                })}
              />
              {errors.password?.type === "minLength" && (
                <span className="text-red-700 text-sm">
                  Password is required
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-700 text-sm">
                  Password must have one uppercase one lowercase one number and
                  one spacial character
                </span>
              )}
              <button className="btn bg-[#07332F] text-white mt-4">
                Register
              </button>
            </fieldset>
            <GoogleLogin />
          </form>
          <h1 className="pt-3">
            All ready have an Account ?{" "}
            <Link className="underline text-blue-700" to="/login">
              Login
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
