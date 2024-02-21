import "./sidebar.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { SlSocialDropbox } from "react-icons/sl";
import { LuClipboardEdit } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/users.service";


const Sidebar = (): JSX.Element => {
  const admin = JSON.parse(localStorage.getItem("admin") as string)
  const userService = new UserService()
  const navigate = useNavigate()
  const location: any = useLocation();
  // const status = useSelector((state:any) => state.update)
  const handleLogout = async () => {
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    navigate('/' , {state: 'logout'})
  } 
  
  return (
    <aside className="sidebarAdmin">
      <div className="informationAdmin">
        <img
          src={admin?.avatar}
          alt=""
        />
        <div className="nameAdmin">
          <p>{admin?.role === 3 ? "Hi, Admin" : `Hi, ${admin?.fullName}`}</p>
          <button
          onClick={handleLogout}
          className="btnLogout">Logout</button>
        </div>
      </div>
      <ul className="menuAdmin">
        <Link
          to={"/dashboard"}
          className={
            location.pathname === "/dashboard" ? "menuAdminItem activeAdmin" : "menuAdminItem"
          }
        >
          <LuLayoutDashboard className="iconMenuAdmin" />
          <span className="menuAdminTitle">Dashboard</span>
        </Link>
        <Link
          to={"/user"}
          className={
            location.pathname === "/user"
              ? "menuAdminItem activeAdmin"
              : "menuAdminItem"
          }
        >
          <TbUsers className="iconMenuAdmin" />
          <span className="menuAdminTitle">Users</span>
        </Link>
        <Link
          to={"/product"}
          className={
            location.pathname === "/product"
              ? "menuAdminItem activeAdmin"
              : "menuAdminItem"
          }
        >
          <SlSocialDropbox className="iconMenuAdmin" />
          <span className="menuAdminTitle">Products</span>
        </Link>
        <Link
          to={"/order"}
          className={
            location.pathname === "/order"
              ? "menuAdminItem activeAdmin"
              : "menuAdminItem"
          }
        >
          <LuClipboardEdit className="iconMenuAdmin" />
          <span className="menuAdminTitle">Orders</span>
        </Link>
      </ul>
      <ToastContainer/>
    </aside>
  );
};

export default Sidebar;
