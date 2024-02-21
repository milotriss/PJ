import React, { ChangeEvent, useEffect, useState } from "react";
import "./forgotPassword.css";
import UserService from "../../services/users.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import Loading from "../loanding/loading";
import { Steps } from "antd";
import OtpInput from "react-otp-input";
interface Props {
  offForgot: Function;
}
const ForgotPassword = (props: Props): JSX.Element => {
  const userService = new UserService();
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChangePass, setChangePass] = useState<boolean>(false);
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const [confirmOtp, setConfirmOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSendMail, setIsSendMail] = useState<boolean>(true);
  const changeOtp = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);
  // const changeConfirmOtp = (e: ChangeEvent<HTMLInputElement>) => {
  //   setConfirmOtp(Number(e.target.value));
  // };
  const handleSend = async () => {
    setIsLoading(true);
    const result = await userService.createOtp(email);
    if (result === 1) {
      setIsLoading(false);
      setStep(1);
      notifySuccess("OTP has been sent to your email, thanks!");
      setIsOtp(true);
      setIsSendMail(false);
    } else {
      setIsLoading(false);
      notifyWarning("Your email incorrect!!!");
    }
  };
  const handleOtp = async () => {
    setIsLoading(true);
    const result = await userService.confirmOtp(Number(confirmOtp));
    if (result === 1) {
      setIsLoading(false);
      setChangePass(true);
      setStep(2);
    } else {
      setIsLoading(false);
      notifyWarning("OTP incorrect!!!");
    }
  };
  // Change Password
  const [newPass, setNewPass] = useState<string>("");
  const changeNewPass = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPass(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 16) {
      e.target.style.border = "2px solid red";
    } else {
      e.target.style.border = "2px solid #000";
    }
  };
  const changeConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== newPass) {
      e.target.style.border = "2px solid red";
    } else {
      e.target.style.border = "2px solid #000";
    }
  };
  const handleChangePass = async () => {
    setIsLoading(true);
    const result = await userService.changePass(newPass);
    if (result === 1) {
      setIsLoading(false);
      notifySuccess("Pass changed successfully");
      props.offForgot();
    } else {
      setIsLoading(false);
      notifyWarning("Something is wrong hihi ^^!!!");
      setIsOtp(false);
    }
  };
  return (
    <section
      onClick={(e: any) => {
        e.stopPropagation();
        props.offForgot();
      }}
      className="popUpForgotOverlay"
    >
      {isLoading && <Loading />}
      <div onClick={(e: any) => e.stopPropagation()} className="popUpForgot">
        <Steps
          current={step}
          items={[
            {
              title: "Send OTP",
            },
            {
              title: "Confirm OTP",
            },
            {
              title: "Change Password",
            },
          ]}
        />
        {/* <h1>Forgot Password</h1> */}
        {isSendMail ? (
          <>
            <input
              value={email}
              onChange={changeOtp}
              placeholder="Your Email"
              name="email"
              type="email"
            />
            <button onClick={handleSend}>Send</button>
          </>
        ) : null}
        {isOtp ? (
          isChangePass ? (
            <div className="changePass">
              <input
                onChange={changeNewPass}
                placeholder="New Password: 4-16 characters"
                type="password"
              />
              <input
                onChange={changeConfirm}
                placeholder="Confirm"
                type="password"
              />
              <button onClick={handleChangePass}>Create</button>
            </div>
          ) : (
            <div className="confirmOtp">
              <h1 style={{fontSize:40,margin:"-40px 0 -30px 0"}}>OTP</h1>
              <div className="enterOtp">
                <OtpInput
                  containerStyle={{
                    display: "flex",
                    gap: 10,
                    width: "100%",
                    alignItems: "center",
                  }}
                  inputStyle={{
                    width: "100%%",
                    height: 50,
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                  value={confirmOtp}
                  onChange={setConfirmOtp}
                  numInputs={5}
                  renderSeparator={<span>_</span>}
                  renderInput={(props) => <input {...props} />}
                />
                {/* <input
                  value={confirmOtp}
                  onChange={changeConfirmOtp}
                  autoFocus
                  placeholder="."
                  type="text"
                /> */}
              </div>
              <button onClick={handleOtp}>Confirm</button>
            </div>
          )
        ) : null}
      </div>
      <ToastContainer />
    </section>
  );
};

export default ForgotPassword;
