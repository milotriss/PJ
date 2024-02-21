import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import "./popUpAddAdmin.css";
import "react-toastify/dist/ReactToastify.css";

import { IUser } from "../../types/interface";

import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import UserService from "../../services/users.service";
import { update } from "../../store/reducers/update";
import { Popconfirm } from "antd";
import Loading from "../loanding/loading";

interface Props {
  offPopUpAdd: Function;
}
interface IAmin {
  userName: string;
  fullName: string;
  password: string;
}
const PopUpAddAdmin = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(()=>{setIsLoading(false)},[])
  const [admin, setAdmin] = useState<IAmin>({
    userName: "",
    fullName: "",
    password: "",
  });
  const userService = new UserService()
  const dispatch = useDispatch();

  const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    let inputElement = e.target;
    if (inputElement.value.length <= 0) {
      inputElement.style.border = "1px solid red";
      inputElement.placeholder = "Enter this field ";
    }
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
    if (e.target.value.length > 0) {
      e.target.style.border = "1px solid #fff";
    } else {
      e.target.style.border = "1px solid #fff";
    }
  };
  const handleAddAdmin = async() => {
    setIsLoading(true)
    if (
      admin.userName === "" ||
      admin.password === "" ||
      admin.fullName === ""
    ) {
      setIsLoading(false)
      notifyError("Please fill all the fields");
      setAdmin({
        userName: "",
        fullName: "",
        password: "",
      })
    }else {
      const result = await userService.createAdmin(admin)
      if (result === 1) {
        props.offPopUpAdd()
        dispatch(update())
        setIsLoading(false)
        notifySuccess("Admin created successfully")
        setAdmin({
          userName: "",
          fullName: "",
          password: "",
        })
      }else{
        setIsLoading(false)
        console.log("Something went wrong");
      }
    }
  };
  return (
    <section className="popUpAddAdminOverlay">
      {isLoading && <Loading/>}
      <div className="popUpAddAdminModal">
        <div className="informationPopUpAddAdmin">
          <div className="namePopUpAddAdmin itemPopUpAddAdmin">
            <input
              value={admin.fullName}
              onChange={handleChangeInput}
              onBlur={handleOnBlur}
              name="fullName"
              className="inputPopUpAddAdmin"
              placeholder="FullName"
              type="text"
            />
          </div>
          <div className="emailPopUpAddAdmin itemPopUpAddAdmin">
            <input
              value={admin.userName}
              onChange={handleChangeInput}
              onBlur={handleOnBlur}
              name="userName"
              className="inputPopUpAddAdmin"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="phonePopUpAddAdmin itemPopUpAddAdmin">
            <input
              value={admin.password}
              onChange={handleChangeInput}
              onBlur={handleOnBlur}
              className="inputPopUpAddAdmin"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>
        <Popconfirm
          title="Update Products"
          description="Are you sure about this information?"
          onConfirm={handleAddAdmin}
          okText="Yes"
          cancelText="No"
        >
          <button>ADD+</button>
        </Popconfirm>
        <button onClick={() => props.offPopUpAdd()}>ESC</button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default PopUpAddAdmin;
