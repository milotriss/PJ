import { IOrderItem, IPayment } from "../types/emtities.types";
import formatPrice from "./formatPrice.common";

const mailPayment = async (payment:IPayment,pointBody:number,orderData:IOrderItem[]) => {
    
    return `
    <h1>Information Payment</h1>
    <table style="width:100%">
      <thead>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Name Receive</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Email Receive</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Phone Receive</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Address Receive</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Payment expression</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Status</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Provisional</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Voucher</th>
          <th style="font-size:20px;font-weight:500;text-align:left;margin-right:20px">Fixed Price</th>
      </thead>
      <tbody style="margin-top:20px">
        <tr>
          <td style="font-size:16px;text-align:left;margin-right:20px">${payment.name}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${payment.email}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${payment.phone}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${payment.address}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${payment.typePayment === 1 ? 'COD' : 'ONLINE'}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">Confirmed</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${formatPrice(Number(payment.subTotal))}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${pointBody}%</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${formatPrice(Number(payment.lastPrice))}</td>
        </tr>
      </tbody>
    </table>
    `
}

export default mailPayment;