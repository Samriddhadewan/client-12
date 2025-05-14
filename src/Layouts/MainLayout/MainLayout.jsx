import { Outlet } from "react-router-dom"
import Navbar from "../../Shared/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-[1150px] mx-auto">
      <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default MainLayout