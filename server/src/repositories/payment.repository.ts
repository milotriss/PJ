import { Op } from "sequelize";
import OrderItem from "../entities/orderItems.entity";
import Payment from "../entities/payments.entity";
import Point from "../entities/point.entity";
import Product from "../entities/products.entity";
import { IOrderItem } from "../types/emtities.types";
import sequelize from "../configs/db.config";


class PaymentRepository {
  async createPayment(payment: any, newOrderData: any, newStock: any,newPoint:number) {
    // Thêm dữ liệu vào bảng payment
    await Payment.create(payment);
    // Đổi trạng thái OrderItems sang đã thanh toán
    newOrderData.forEach(async (element: IOrderItem) => {
      await OrderItem.update(element, { where: { id: element.id } });
    });
    // Cập nhật lại products khi đã trừ stock
    newStock.forEach(async (item: any) => {
      await Product.update({ stock: item.stock }, { where: { id: item.id } });
    });
    // Cập nhật lại point
      await Point.update({point:newPoint + 2},{where:{userId:payment.userId}})
  }
  async updatePayment(id: number, status: number): Promise<any> {
    return await Payment.update({ status: status }, { where: { id: id } });
  }
  async getAllPayments(): Promise<any> {
    return await Payment.findAll();
  }
  async getPaymentsWithUser(userId: number, status?: number): Promise<any> {
    if (status) {
      return await Payment.findAll({
        where: { userId: userId, status: status }
      });
    } else {
      return await Payment.findAll({ where: { userId: userId} });
    }
  }
  async searchPayments(searchValue: string,id?:number): Promise<any> {
    if (id) {
      const data = await sequelize.query(`select * from PJ.payments where substring(payments.createdAt,1) like '%${searchValue}%' and payments.userId = ${id}`)
      return data
      
    }else {
      const data = await sequelize.query(`select * from PJ.payments where substring(payments.createdAt,1) like '%${searchValue}%'`)
      return data
    }
  }
}
export default PaymentRepository;
