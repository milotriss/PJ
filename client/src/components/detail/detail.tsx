import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import "./detail.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaStar } from "react-icons/fa";
import { Flex, Rate } from "antd";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ProductService from "../../services/products.service";
import { IProduct, IRate, IUser } from "../../types/entities.types";
import formatPrice from "../../common/formatPrice.common";
import OrderItemService from "../../services/orderItems.service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../store/reducers/updateCart";
import RateService from "../../services/rates.service";
import formatDate from "../../common/formatDate.common";
import { updateRate } from "../../store/reducers/updateRates";
import { IoWarningOutline } from "react-icons/io5";
import useSocket from "../../hooks/useSocket.hooks";
import Loading from "../loanding/loading";
export interface ICartItem {
  userId: number;
  quantity: number;
  productId: number;
}
interface IReview {
  createdAt: string;
  id: number;
  productId: number;
  rateStar: number;
  review: string;
  updatedAt: string;
  user: [];
  userId: number;
}
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const Detail = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const socket = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const productService = new ProductService();
  const productId = Number(location.pathname.split("/")[2]);
  const [product, setProduct] = useState<IProduct>();
  const getProduct = async () => {
    const data = await productService.getProduct(productId);
    if (data === 2) {
      console.log("Get Product Failed");
    } else {
      setProduct(data);
    }
  };
  useEffect(() => {
    getProduct();
    setIsLoading(false);
  }, []);
  // Add to cart
  const user: IUser = JSON.parse(localStorage.getItem("user") as string);
  const userId = user?.id;
  const token = localStorage.getItem("token") as string;
  const orderItemService = new OrderItemService();
  const dispatch = useDispatch();
  const handleAddCart = async () => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      navigate("/");
    } else {
      const formData: ICartItem = {
        userId: Number(userId),
        productId: Number(productId),
        quantity: 1,
      };
      const result = await orderItemService.createOrderItem(formData);
      if (result === 1) {
        dispatch(updateCart());
        setIsLoading(false);
        notifySuccess("Add to cart successfully");
      } else if (result === 2) {
        setIsLoading(false);
        notifyWarning("This product has already been in your cart");
      }
    }
  };
  // Rates
  const [value, setValue] = useState<number>(4);
  const [review, setReview] = useState<string>("");
  const [reviewData, setReviewData] = useState<IReview[]>([]);
  const [rateStar, setRateStar] = useState<number>(5);
  const rateService = new RateService();
  const updateRates = useSelector((state: any) => state.updateRate);
  const changeReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 255) {
      setReview(e.target.value);
    }
  };
  const handleReview = async () => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      navigate("/");
    } else {
      if (review === "") {
        setIsLoading(false);
        notifyWarning("Your review is empty");
      } else {
        const formRate: IRate = {
          productId,
          rateStar: value,
          review: review,
        };
        const result = await rateService.createRate(Number(userId), formRate);
        if (result === 1) {
          dispatch(updateRate());
          setReview("");
          socket.emit("createReview", productId);
          setIsLoading(false);
          notifySuccess("Rate created");
        } else {
          setIsLoading(false);
          notifyWarning("Something went wrong");
        }
      }
    }
  };
  // Get Rates
  const getRates = async () => {
    setIsLoading(true);
    const result = await rateService.getRates(productId);
    if (result === 2) {
      setIsLoading(false);
      console.log("get rates something went wrong");
    } else {
      const data = result.reverse();
      setIsLoading(false);
      setReviewData(data);
    }
  };
  useEffect(() => {
    getRates();
  }, [updateRates]);

  useMemo(() => {
    if (reviewData.length > 0) {
      const result = reviewData.reduce(
        (init: number, item: IReview) => init + item.rateStar,
        0
      );
      setRateStar(Math.round((result / reviewData.length) * 10) / 10);
    }
  }, [reviewData]);
  //  Delete Rate
  const handleDeleteRate = async (id: number) => {
    setIsLoading(true);
    const result = await rateService.deleteRate(id);
    if (result === 1) {
      setIsLoading(false);
      notifySuccess("Delete rate successfully");
      dispatch(updateRate());
    } else {
      setIsLoading(false);
      console.log("Something went wrong");
    }
  };
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  useEffect(() => {
    socket.on("updateReview", async (id: any) => {
      if (id === productId) {
        getRates();
      }
    });
  }, [socket, updateRate]);

  return (
    <section className="detail">
      {isLoading && <Loading />}
      <h1>Detail</h1>
      <figure>
        <div className="detailImg">
          <img src={product?.images} alt="" />
        </div>
        <figcaption>
          <div className="detailTitle">
            <h2>{product?.name}</h2>
            <span>{formatPrice(Number(product?.price))}</span>
          </div>
          <span className="detailImgRate">
            {rateStar} <FaStar className="iconDetail" />
          </span>
          <ul>
            <li>
              <p>*Description:</p>
              {product?.desc}
            </li>
            <li>
              <p>*Ingredients:</p>
              {product?.ingredients}
            </li>
            <li>
              <p>*Allergens:</p>
              {product?.allergens}
            </li>
          </ul>
        </figcaption>
      </figure>
      <div className="detailActions">
        <div className="detailActionReview">
          <Flex gap="middle">
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? <span>{desc[value - 1]}</span> : null}
          </Flex>
          <div className="detailActionWrites">
            <textarea
              onChange={changeReview}
              value={review}
              placeholder="Enter your Review"
              id=""
            />
            <div className="detailActionWrite">
              <span>{review.length}/255 Chars</span>
              <button onClick={handleReview}>Review</button>
            </div>
          </div>
        </div>
        <div className="detailActionAdd">
          <button onClick={handleAddCart}>Add To Cart</button>
        </div>
      </div>
      <div className="detailReviews">
        {reviewData.length > 0 &&
          reviewData.map((item: any) => {
            return (
              <div key={item.id} className="detailReview">
                <div className="detailReviewInfo">
                  <img src={item.user.userInfo.avatar} alt="" />
                  <p>
                    {item.user.firstName} {item.user.lastName}
                  </p>
                  <span className="detailImgRate">
                    {item.rateStar} <FaStar className="iconDetail" />
                  </span>
                </div>
                <div className="detailReviewText">
                  <p>{item.review}</p>
                  <div className="detailReviewAction">
                    <span className="detailReviewDate">
                      {formatDate(item.createdAt)}
                    </span>
                    {token && userId === item.userId ? (
                      <>
                        <React.Fragment>
                          <span
                            onClick={handleClickOpen2}
                            className="detailReviewDelete"
                          >
                            delete
                          </span>
                          <Dialog
                            fullWidth
                            open={open2}
                            onClose={handleClose2}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                              id="alert-dialog-title"
                            >
                              <IoWarningOutline
                                style={{ color: "#d5bc04", fontSize: 30 }}
                              />
                              {"Delete"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText
                                style={{ fontSize: 20 }}
                                id="alert-dialog-description"
                              >
                                Are you delete this Comment?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                style={{
                                  color: "rgb(252, 168, 182)",
                                  fontSize: "20px",
                                }}
                                onClick={handleClose2}
                              >
                                Disagree
                              </Button>
                              <Button
                                style={{
                                  color: "rgb(252, 168, 182)",
                                  fontSize: "20px",
                                }}
                                onClick={() => {
                                  handleClose2();
                                  handleDeleteRate(item.id);
                                }}
                                autoFocus
                              >
                                Agree
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="getVoucherDetail">
        <h2>Get 15 point for first order from Huong Bakery</h2>
        <div className="getVoucherDetailInput">
          <input placeholder="Enter your email to get VOUCHER" type="text" />
          <FaLongArrowAltRight className="iconDetailVoucher" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Detail;
