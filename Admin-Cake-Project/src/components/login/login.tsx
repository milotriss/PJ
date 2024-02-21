import React, { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import './login.css'
import { notifySuccess, notifyWarning } from "../../common/toastify";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/users.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loanding/loading";



export interface ILogin {
  id?: number;
  userName: string;
  password: string;
}
const Login = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<ILogin>({
    userName: "",
    password: "",
  });
  const location = useLocation()
  useEffect(() =>{setIsLoading(false)},[])
  useEffect(()=> {
    if (location.state === "logout") {
      notifySuccess('Logout Success')
    }
  },[location.pathname])
  const navigate = useNavigate();
  const userService = new UserService()
  const changeLogin = (e:ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
      setIsLoading(true)
      if (loginData.userName === '' || loginData.password === '') {
        notifyWarning('Please enter all fields')
        setLoginData({
          userName:'',
          password:''
        })
        setIsLoading(false)
      }else {
        const result = await userService.login(loginData)
        if (result === 0) {
          setIsLoading(false)
          notifyWarning('Username is incorrect')
        }else if (result === 2) {
          setIsLoading(false)
          notifyWarning('Password is incorrect')
        }else{
          setIsLoading(false)
          localStorage.setItem("token",result.accessToken)
          localStorage.setItem("admin",JSON.stringify(result.admin))
          navigate('/dashboard',{state: 'login'})
        }
      }
  }
  return (
    <div className="admin__login">
      {isLoading && <Loading/>}
      <div className="admin__login-overlay">
        <form>
          <h1>Huong Bakery</h1>
          <input onChange={changeLogin} value={loginData.userName} name="userName" id="email-admin" placeholder="Email" type="text" />
          <input onChange={changeLogin} value={loginData.password} name="password" id="password-admin" placeholder="Password" type="password" />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
