import React, { useMemo, useState } from "react";
import "./modalHistoryDetail.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import formatPrice from "../../common/formatPrice.common";
import { IPaymentOnline } from "../cart/cart";
interface Props {
  offHistoryDetail: Function;
  dataPass:IPaymentOnline[]
  lastPrice:number
}
const ModalHistoryDetail = (props: Props): JSX.Element => {
  return (
    <div
      onClick={() => props.offHistoryDetail()}
      className="orderHistoryDetailOverlay"
    >
      <div
        onClick={(e: any) => e.stopPropagation()}
        className="orderHistoryDetail"
      >
        <div className="orderHistoryDetailTitle">
          <h2>Order Detail</h2>
          <p>Total: {formatPrice(Number(props.lastPrice))}</p>
          <AiOutlineCloseCircle
            onClick={() => props.offHistoryDetail()}
            className="iconHistoryClose"
          />
        </div>
        <ul className="orderHistoryDetailList">
          {props.dataPass.length > 0 &&
            props.dataPass.map((item: any) => {
              return (
                <li key={item.id}>
                  <img src={item.images} alt="" />
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                  <span>{formatPrice(item.totalPrice)}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ModalHistoryDetail;
