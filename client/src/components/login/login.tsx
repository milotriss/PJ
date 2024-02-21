import React, { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import "./login.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TiLockClosedOutline } from "react-icons/ti";
import { TiLockOpenOutline } from "react-icons/ti";
import { IoArrowRedoOutline } from "react-icons/io5";
import { IoArrowUndoOutline } from "react-icons/io5";
import ForgotPassword from "../forgotPassword/forgotPassword";
import { IUser } from "../../types/entities.types";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import UserService from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/reducers/updateProfile";
import { updateCart } from "../../store/reducers/updateCart";
import Loading from "../loanding/loading";

interface Props {
  offLogin: Function;
}
export interface ILogin {
  email: string;
  password: string;
}
const Login = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onSignUp, setOnSignUp] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);
  const [formRegister, setFormRegister] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const userService = new UserService();
  // Quên mật khẩu
  const offForgot = () => {
    setForgot(false);
  };
  // Đăng ký
  const handleBlurRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const parentElements = e.target.parentElement as HTMLElement;
    const labelElements = parentElements.querySelector(
      ".labelSignUp"
    ) as HTMLLabelElement;
    if (e.target.value.length === 0) {
      e.target.style.border = "3px solid red";
      labelElements.style.color = "red";
    }
  };
  const changeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
    const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$");
    const isValid = regex.test(formRegister.email);
    const parentElements = e.target.parentElement as HTMLElement;
    const labelElements = parentElements.querySelector(
      ".labelSignUp"
    ) as HTMLLabelElement;
    if (e.target.value.length !== 0) {
      e.target.style.border = "3px solid rgb(252, 168, 182)";
      labelElements.style.color = "rgb(252, 168, 182)";
    } else {
      e.target.style.border = "3px solid red";
      labelElements.style.color = "red";
    }
    if (e.target.name === "email" && !isValid) {
      e.target.style.border = "3px solid red";
      labelElements.style.color = "red";
      labelElements.innerText = "Email Syntax";
    } else if (e.target.name === "email" && isValid) {
      e.target.style.border = "3px solid rgb(252, 168, 182)";
      labelElements.style.color = "rgb(252, 168, 182)";
      labelElements.innerText = "Email *";
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 4 || e.target.value.length > 16) {
        e.target.style.border = "3px solid red";
        labelElements.style.color = "red";
        labelElements.innerText = "Password: 4-16 characters";
      } else {
        e.target.style.border = "3px solid rgb(252, 168, 182)";
        labelElements.style.color = "rgb(252, 168, 182)";
        labelElements.innerText = "Password *";
      }
    }
  };
  const changeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const parentElements = e.target.parentElement as HTMLElement;
    const labelElements = parentElements.querySelector(
      ".labelSignUp"
    ) as HTMLLabelElement;
    if (e.target.value !== formRegister.password) {
      e.target.style.border = "3px solid red";
      labelElements.style.color = "red";
      labelElements.innerText = "Incorrect Password";
    } else {
      e.target.style.border = "3px solid rgb(252, 168, 182)";
      labelElements.style.color = "rgb(252, 168, 182)";
      labelElements.innerText = "Confirm Correct";
    }
  };
  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (
      formRegister.firstName === "" ||
      formRegister.lastName === "" ||
      formRegister.email === "" ||
      formRegister.password === ""
    ) {
      setIsLoading(false)
      notifyWarning("Please enter all fields");
    } else {
      const data = await userService.register(formRegister);
      if (data === 1) {
        setIsLoading(false);
        notifySuccess("Register Success");
        setOnSignUp(false);
        setFormRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } else {
        setIsLoading(false);
        notifyWarning("Email is exist");
      }
    }
  };
  // Đăng Nhập
  const dispatch = useDispatch();
  const [formLogin, setLogin] = useState<ILogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (formLogin.email === "" || formLogin.password === "") {
      setIsLoading(false)
      notifyWarning("Please enter all fields");
    } else {
      try {
        const data = await userService.login(formLogin);
        if (data.status === 200) {
          if (data.data.data.user.status === 1) {
            setIsLoading(false);
            localStorage.setItem("token", data.data.data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.data.data.user));
            props.offLogin();
            navigate("/", { state: "login" });
            dispatch(updateProfile());
            dispatch(updateCart());
          } else {
            setIsLoading(false);
            notifyWarning("Your account has been Blocked");
            return;
          }
        }
      } catch (error: any) {
        if (error.response.status === 500) {
          setIsLoading(false);
          notifyWarning("Login Failed");
        } else if (error.response.status === 404) {
          setIsLoading(false);
          notifyWarning("Email is not exist!");
        } else if (error.response.status === 400) {
          setIsLoading(false);
          notifyWarning("Password incorrect!");
        }
      }
    }
  };
  return (
    <section onClick={() => props.offLogin()} className="loginOverlay">
      {isLoading && <Loading />}
      <div onClick={(e: any) => e.stopPropagation()} className="login">
        <div className="signIn">
          <h1>Login</h1>
          <form className="signInEnters">
            <div className="signInEnter">
              <input
                onChange={changeLogin}
                value={formLogin.email}
                placeholder=" "
                name="email"
                type="email"
              />
              <label className="labelSignIn" htmlFor="">
                Email
              </label>
            </div>
            <div className="signInEnter">
              <input
                onChange={changeLogin}
                value={formLogin.password}
                placeholder=" "
                name="password"
                type="password"
              />
              <label className="labelSignIn" htmlFor="">
                Password
              </label>
            </div>
            <button onClick={handleLogin}>Create</button>
          </form>
          <span onClick={() => setForgot(true)} className="forgotPasswordLogin">
            Forgot Password ?
          </span>
          <h2>Login With</h2>
          <div className="signInBrand">
            <FaFacebook className="iconSignInBrand" />
            <FaInstagram className="iconSignInBrand" />
            <FaGoogle className="iconSignInBrand" />
          </div>
          <span onClick={() => setOnSignUp(true)} className="toSignUp">
            Register <IoArrowRedoOutline className="changeLogin" />
          </span>
          <span onClick={() => props.offLogin()} className="existLogin">
            Exist
          </span>
        </div>
        <div className={onSignUp ? "imgLogin activeLogin" : "imgLogin"}>
          <h1>Welcome Back Huong Bakery</h1>
          <p>Wishing you a great experience with sweet flavors</p>
        </div>
        <div className="signUp">
          <h1>Register</h1>
          <div className="signUpEnters">
            <div className="signUpEnter">
              <input
                value={formRegister.firstName}
                onChange={changeRegister}
                onBlur={handleBlurRegister}
                className="inputRegister"
                placeholder=" "
                name="firstName"
                type="text"
              />
              <label className="labelSignUp" htmlFor="">
                First Name *
              </label>
            </div>
            <div className="signUpEnter">
              <input
                value={formRegister.lastName}
                onChange={changeRegister}
                onBlur={handleBlurRegister}
                className="inputRegister"
                placeholder=" "
                name="lastName"
                type="text"
              />
              <label className="labelSignUp" htmlFor="">
                Last Name *
              </label>
            </div>
            <div className="signUpEnter">
              <input
                value={formRegister.email}
                onChange={changeRegister}
                onBlur={handleBlurRegister}
                className="inputRegister"
                placeholder=" "
                name="email"
                type="email"
              />
              <label className="labelSignUp" htmlFor="">
                Email *
              </label>
            </div>
            <div className="signUpEnter">
              <input
                value={formRegister.password}
                onChange={changeRegister}
                onBlur={handleBlurRegister}
                className="inputRegister"
                placeholder=" "
                name="password"
                type={!lock ? "password" : "text"}
              />
              <label className="labelSignUp" htmlFor="">
                Password *
              </label>
              {!lock ? (
                <TiLockClosedOutline
                  onClick={() => setLock(true)}
                  className="lockPass"
                />
              ) : (
                <TiLockOpenOutline
                  onClick={() => setLock(false)}
                  className="lockPass"
                />
              )}
            </div>
            <div className="signUpEnter">
              <input
                onChange={changeConfirmPassword}
                className="inputRegister"
                placeholder=" "
                name="confirm"
                type="password"
              />
              <label className="labelSignUp" htmlFor="">
                Confirm Password *
              </label>
            </div>
            <button onClick={handleRegister}>Create</button>
          </div>
          <span onClick={() => setOnSignUp(false)} className="toSignIn">
            <IoArrowUndoOutline className="changeLogin" /> Login
          </span>
          <span onClick={() => props.offLogin()} className="existLogin">
            Exist
          </span>
        </div>
      </div>
      {forgot ? <ForgotPassword offForgot={offForgot} /> : null}
      <ToastContainer />
    </section>
  );
};

export default Login;
