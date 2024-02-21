import { PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyWarning } from "../../common/toastify.common";
import PaymentService from "../../services/payments.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCart } from "../../store/reducers/updateCart";
import { IPaymentOnline } from "../cart/cart";


type Props = {
  amount: number;
  paymentData: IPaymentOnline;
};

const PaypalComponent = (props: Props) => {
  const amount = props.amount;
  const paymentService = new PaymentService();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handlePaymentSuccess = async () => {
    if (amount === 0) {
      notifyWarning("Your cart is empty");
    } else {
      const result = await paymentService.createPayment(
        Number(props.paymentData.userId),
        {...props.paymentData,lastPrice: amount * 23000}
      );
      console.log(props.paymentData);
      
      if (result === 1) {
        navigate("/", { state: "paymentSuccess" });
        dispatch(updateCart());
      } else {
        notifyWarning("Payment Failed");
      }
    }
  };
  return (
    <>
      <PayPalButtons
        style={{
          layout: "horizontal",
          height: 48,
          color: "white",
        }}
        createOrder={(_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: String(amount),
                },
                description: `Purchase at ${new Date().toLocaleString()}`,
              },
            ],
          });
        }}
        onApprove={(_: any, actions: any): any => {
          return actions.order?.capture().then(() => handlePaymentSuccess());
        }}
      />
      <ToastContainer/>
    </>
  );
};

export default PaypalComponent;
