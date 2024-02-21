import React, { ChangeEvent, useEffect, useState } from "react";
import "./feedback.css";
import { Link, useNavigate } from "react-router-dom";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import UserService from "../../services/users.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess } from "../../common/toastify.common";
import { useDispatch, useSelector } from "react-redux";
import { updateFeedback } from "../../store/reducers/updateFeedback";
import formatDate from "../../common/formatDate.common";
import Loading from "../loanding/loading";
interface IFeedback {
  id: number;
  userId: number;
  createdAt: string;
  content: string;
  emotion: number;
  updatedAt: string;
  user: [];
}
const Feedback = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const userId = user?.id;
  const userService = new UserService();
  const [feedBacks, setFeedbacks] = useState<IFeedback[]>([]);
  console.log(feedBacks);

  const navigate = useNavigate();
  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  // Create new feedback
  const [emotions, setEmotion] = useState<number>(4);
  const [contents, setContent] = useState<string>("");
  const dispatch = useDispatch();
  const updateFeedbacks = useSelector((state: any) => state.updateFeedback);
  const changeEmotion = (e: any) => {
    setEmotion(e);
  };
  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleFeedback = async () => {
    setIsLoading(true);
    if (token) {
      const data = {
        content: contents,
        emotion: emotions,
      };
      const result = await userService.createFeedback(Number(userId), data);
      if (result === 1) {
        setIsLoading(false);
        notifySuccess("Feedback successfully");
        setContent("");
        dispatch(updateFeedback());
      } else {
        setIsLoading(false);
        console.log("Create feedback failed");
      }
    } else {
      setIsLoading(false)
      navigate("/");
    }
  };
  // Get All Feedbacks
  useEffect(() => {
    const getFeedbacks = async () => {
      setIsLoading(true)
      const result = await userService.getFeedbacks();
      // console.log(result);
      if (result === 2) {
        setIsLoading(false)
        console.log("Get feedback failed");
      } else {
        setIsLoading(false) 
        setFeedbacks(result);
      }
    };
    getFeedbacks();
  }, [updateFeedbacks]);
  return (
    <section id="feedback" className="feedBack">
      {isLoading && <Loading/>}
      <h1 className="animate" data-animate='tracking-in-expand 1s'>Feed Back</h1>
      <div className="cardsFeedBack">
        {feedBacks.length > 0 &&
          feedBacks.map((feedBack: any) => {
            return (
              <div key={feedBack.id} className="cardFeedBack">
                <div className="cardFeedBackTop">
                  <img src={feedBack.user.userInfo.avatar} alt="" />
                  <div className="cardFeedBackName">
                    <p>
                      {feedBack.user.firstName} {feedBack.user.lastName}
                    </p>
                    <span>{formatDate(feedBack.createdAt)}</span>
                  </div>
                  {feedBack.emotion === 4 || feedBack.emotion === 5 ? (
                    <SmileOutlined className="iconFeedBack" />
                  ) : null}
                  {feedBack.emotion === 3 ? (
                    <MehOutlined className="iconFeedBack" />
                  ) : null}
                  {feedBack.emotion === 2 || feedBack.emotion === 1 ? (
                    <FrownOutlined className="iconFeedBack" />
                  ) : null}
                </div>
                <p className="reviewText">{String(feedBack.content)}</p>
              </div>
            );
          })}
      </div>
      <div className="reviewGroup">
        <div className="addFeedBack animate" data-animate='slideInBottom 1s'>
          <h2>Write something for our service Thank you</h2>
          <Rate
            onChange={changeEmotion}
            className="iconReview"
            defaultValue={4}
            value={emotions}
            character={({ index = 0 }) => customIcons[index + 1]}
          />
          <textarea
            onChange={handleContent}
            value={contents}
            name=""
            id=""
          ></textarea>
          <button onClick={handleFeedback}>Submit Feedback</button>
        </div>
        <img
        className="animate" data-animate='slideInRight 1s'
          src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Banners%2F1019888.jpg?alt=media&token=3d2f3508-b7a1-4466-8be0-522b9b4d2939"
          alt=""
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default Feedback;
