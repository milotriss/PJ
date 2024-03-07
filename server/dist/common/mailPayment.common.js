"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatPrice_common_1 = __importDefault(require("./formatPrice.common"));
const mailPayment = (payment, pointBody, orderData) => __awaiter(void 0, void 0, void 0, function* () {
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
          <td style="font-size:16px;text-align:left;margin-right:20px">${(0, formatPrice_common_1.default)(Number(payment.subTotal))}</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${pointBody}%</td>
          <td style="font-size:16px;text-align:left;margin-right:20px">${(0, formatPrice_common_1.default)(Number(payment.lastPrice))}</td>
        </tr>
      </tbody>
    </table>
    `;
});
exports.default = mailPayment;
