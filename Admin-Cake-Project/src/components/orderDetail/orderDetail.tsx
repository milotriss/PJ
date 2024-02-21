import React, { useEffect, useMemo, useState } from "react";
import "./orderDetail.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ICart, IOrder } from "../../types/interface";
import OrderService from "../../services/orders.service";
import { formatPrice } from "../../common/formatPrice";
import { IDetailHistory } from "../orders/orders";
interface Props {
  offOrderDetails: Function;
  detailHistory: IDetailHistory[];
}
const OrderDetail = (props: Props): JSX.Element => {
  return (
    <div className="orderDetailOverlay">
      <div className="orderDetail">
        <div className="orderDetailTitle">
          <h1>Order Detail</h1>
          <AiOutlineCloseCircle
            className="iconClose"
            onClick={() => props.offOrderDetails()}
          />
        </div>
        <ul className="orderDetailList">
          {props.detailHistory?.length > 0 &&
            props.detailHistory?.map((item: any) => {
              return (
                <li key={item.id}>
                  <img src={item.images} alt="" />
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                  <span>{formatPrice(item?.price * item?.quantity)}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetail;
