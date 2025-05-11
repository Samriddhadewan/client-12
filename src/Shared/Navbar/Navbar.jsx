import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.jpeg";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
  const { user, handleUserLogout } = useAuth();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    handleUserLogout()
      .then(() => {
        console.log("User logged out successfully");
        toast.success("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allCamps">All Camps</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img className="w-10 h-10" src={Logo}></img>
          Medicamp
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user && user?.email ? (
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content flex flex-col gap-1 bg-base-100 rounded-box z-1 mt-[-2] w-52 p-2 shadow"
            >
              <p className="text-center">{user?.displayName}</p>
              {isAdmin ? (
                <>
                  {" "}
                  <button  className="btn w-full  bg-[#07332F] text-white">
                    <li>
                      <Link to="/dashboard/adminProfile">Dashboard</Link>
                    </li>
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button className="btn w-full  bg-[#07332F] text-white">
                    <li>
                      <Link to="/dashboard/userProfile">Dashboard</Link>
                    </li>
                  </button>
                </>
              )}
              <button
                onClick={handleLogOut}
                className="btn  bg-[#07332F] text-white"
              >
                Log out
              </button>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#07332F] text-white">
            join now
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
