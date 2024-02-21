import React, { useEffect, useState, ChangeEvent, useMemo } from "react";
import OrderItemService from "../../services/orderItems.service";
import formatPrice from "../../common/formatPrice.common";
import PaymentService from "../../services/payments.service";
import PaypalComponent from "../paypal/paypal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./cart.css";
import "react-toastify/dist/ReactToastify.css";
import { ICart, IUser } from "../../types/entities.types";
import { updateCart } from "../../store/reducers/updateCart";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillSave2Fill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import Loading from "../loanding/loading";
interface IFormPayment {
  name: string;
  address: string;
  phone: string;
}
export interface IPaymentOnline {
  name: string;
  email: string;
  address: string;
  phone: string;
  userId: string;
  typePayment: string;
  subTotal: string;
  lastPrice: string;
  point: string;
}
const Cart = (): JSX.Element => {
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const user: IUser = JSON.parse(localStorage.getItem("user") as string);
  const userId = user.id;
  const orderItemService = new OrderItemService();
  const [carts, setCart] = useState<ICart[]>([]);
  const updateCarts = useSelector((state: any) => state.updateCart);
  const dispatch = useDispatch();
  const getCart = async () => {
    const data: any = await orderItemService.getCart(Number(userId));
    setCart(data);
  };
  useEffect(() => {
    getCart();
  }, [updateCarts]);
  // Confirm delete
  console.log(carts);

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    const result = await orderItemService.deleteItem(id);
    if (result === 1) {
      dispatch(updateCart());
      setIsLoading(false);
      notifySuccess("Delete successfully");
    } else if (result === 2) {
      setIsLoading(false)
      notifyWarning("Delete Not Found");
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Update quantity
  const [quantity, setQuantity] = useState<number>(1);
  const changeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };
  const handleUpdateQuantity = async (cart: ICart) => {
    if (quantity < 1) {
      setOpen(true);
    } else {
      setIsLoading(true)
      const result = await orderItemService.updateQuantity(cart, quantity);
      if (result === 0) {
        setIsLoading(false)
        notifyWarning("Product is not enough, so sorry");
      } else if (result === 1) {
        dispatch(updateCart());
        setIsLoading(false)
      }
    }
  };
  // Get point
  const [points, setPoints] = useState<number>(0);
  const getPoints = async () => {
    const data = await orderItemService.getPoints(Number(userId));
    setPoints(data.point);
  };
  useEffect(() => {
    getPoints();
    setIsLoading(false)
  }, []);

  // TotalPrice
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [lastPrice, setLastPrice] = useState<number>(0);
  const [voucher, setVoucher] = useState<number>(0);
  useMemo(() => {
    const result = carts.reduce(
      (init: number, item: ICart) => init + item.totalPrice,
      0
    );
    setTotalPrice(result);
    setLastPrice(result);
  }, [carts]);
  // Last price

  const changeVoucher = async (e: ChangeEvent<HTMLSelectElement>) => {
    const voucherValue = Number(e.target.value);
    if (voucherValue <= points) {
      setVoucher(Number(voucherValue));
    } else {
      notifyWarning("Your points is enough");
    }
  };
  useMemo(() => {
    if (voucher !== 0) {
      const newPrice = totalPrice - totalPrice * (voucher / 100);
      setLastPrice(newPrice);
    } else {
      setLastPrice(totalPrice);
    }
  }, [voucher]);
  // Payments
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const navigate = useNavigate();
  const paymentService = new PaymentService();
  const [isBtnPayment, setIsBtnPayment] = useState<boolean>(false);
  const [formPayments, setFormPayment] = useState<IFormPayment>({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentOnline, setPaymentOnline] = useState<IPaymentOnline>({
    name: "",
    email: "",
    address: "",
    phone: "",
    userId: "",
    typePayment: "",
    subTotal: "",
    lastPrice: "",
    point: "",
  });
  const changePayment = (e: ChangeEvent<HTMLInputElement>) => {
    setFormPayment({
      ...formPayments,
      [e.target.name]: e.target.value,
    });
  };

  const handleCOD = async () => {
    setIsLoading(true)
    if (
      formPayments.name === "" ||
      formPayments.address === "" ||
      formPayments.phone === ""
    ) {
      setIsLoading(false)
      notifyWarning("Please fill all fields");
    } else if (totalPrice === 0) {
      setIsLoading(false)
      notifyWarning("Your cart is empty");
    } else {
      const dataPayments = {
        ...formPayments,
        userId: userId,
        email: user.email,
        typePayment: 1,
        subTotal: totalPrice,
        lastPrice: lastPrice,
        point: voucher,
      };
      const result = await paymentService.createPayment(
        Number(userId),
        dataPayments
      );
      if (result === 1) {
        dispatch(updateCart());
        setIsLoading(false)
        navigate("/", { state: "paymentSuccess" });
      } else {
        setIsLoading(false)
        notifyWarning("Payment Failed");
      }
    }
  };
  // Paypal
  useEffect(() => {
    if (
      formPayments.name === "" ||
      formPayments.address === "" ||
      formPayments.phone === ""
    ) {
    } else {
      setIsBtnPayment(true);
      setPaymentOnline({
        ...formPayments,
        email: user.email,
        userId: String(userId),
        typePayment: "2",
        subTotal: String(totalPrice),
        lastPrice: String(Number(lastPrice) / 24000),
        point: String(voucher),
      });
    }
  }, [formPayments.name, formPayments.address, formPayments.phone, voucher]);

  return (
    <section className="cartAndPayment">
      {isLoading && <Loading/>}
      <div className="cart">
        <h1>Shopping Cart</h1>
        <Link to={"/shop"} className="cartBackToShop">
          <FaArrowLeftLong /> Back to shopping
        </Link>
        <ul>
          {carts.length === 0 ? (
            <img
              src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
              alt=""
            />
          ) : (
            carts.map((cart: any) => {
              return (
                <li key={cart.id}>
                  <img src={cart.images} alt="" />
                  <p style={{ width: "30%" }}>{cart.name}</p>
                  <div className="cartAction">
                    <input
                      defaultValue={1}
                      onChange={changeQuantity}
                      type="text"
                    />
                    <BsFillSave2Fill
                      onClick={() => handleUpdateQuantity(cart)}
                      style={{ fontSize: 30 }}
                      className="iconCart"
                    />
                  </div>
                  <p>{formatPrice(Number(cart.totalPrice))}</p>
                  <React.Fragment>
                    <FaRegTrashCan
                      className="iconCart"
                      onClick={handleClickOpen}
                    ></FaRegTrashCan>
                    <Dialog
                      fullWidth
                      open={open}
                      onClose={handleClose}
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
                        {"Delete Item"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          style={{ fontSize: 20 }}
                          id="alert-dialog-description"
                        >
                          Are you sure delete this Item ?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          style={{
                            color: "rgb(252, 168, 182)",
                            fontSize: "20px",
                          }}
                          onClick={handleClose}
                        >
                          Disagree
                        </Button>
                        <Button
                          style={{
                            color: "rgb(252, 168, 182)",
                            fontSize: "20px",
                          }}
                          onClick={() => {
                            handleClose();
                            handleDelete(cart.id);
                          }}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="payment">
        <h1>Payments</h1>
        <div className="paymentAction">
          <div className="paymentVoucher">
            <h2>Your Bill</h2>
            <select onChange={changeVoucher} name="">
              <option value="0">--Voucher--</option>
              {points >= 10 ? <option value="10">10%</option> : null}
              {points >= 15 ? <option value="15">15%</option> : null}
              {points >= 20 ? <option value="20">20%</option> : null}
              {points >= 25 ? <option value="25">25%</option> : null}
              {points >= 30 ? <option value="30">30%</option> : null}
            </select>
            <span className="subTotal">
              <strong>Subtotal price</strong> {formatPrice(Number(totalPrice))}
            </span>
            <hr />
            <span className="paymentTotalPrice">
              <strong>Total</strong> {formatPrice(Number(lastPrice))}
            </span>
          </div>
          <div className="deliveryInfo">
            <h2>Delivery Information</h2>
            <div className="paymentNamePhone">
              <input
                value={formPayments.name}
                onChange={changePayment}
                name="name"
                placeholder="Your Name"
                type="text"
              />
              <input
                value={formPayments.phone}
                onChange={changePayment}
                name="phone"
                placeholder="Phone receive"
                type="text"
              />
            </div>
            <input
              value={formPayments.address}
              onChange={changePayment}
              name="address"
              placeholder="Address receive"
              type="text"
            />
            {isBtnPayment ? (
              <div className="paymentCheckoutBtn">
                <React.Fragment>
                  <button onClick={handleClickOpen2}>
                    <i>COD</i>
                  </button>
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
                      {"Payment"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        style={{ fontSize: 20 }}
                        id="alert-dialog-description"
                      >
                        Are you sure payment?
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
                          handleCOD();
                        }}
                        autoFocus
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
                <PaypalComponent
                  paymentData={paymentOnline}
                  amount={Math.round((lastPrice / 23000) * 100) / 100}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Cart;
