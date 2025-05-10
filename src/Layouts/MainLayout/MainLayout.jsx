import { Outlet } from "react-router-dom"
import Navbar from "../../Shared/Navbar/Navbar"

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-[1150px] mx-auto">
      <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default MainLayout