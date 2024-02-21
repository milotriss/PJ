import PaymentRepository from "../repositories/payment.repository";
import { IOrderItem, IPayment, IProduct } from "../types/emtities.types";
import OrderItemService from "./orderItem.service";
import ProductService from "./products.service";
import PointRepository from "../repositories/points.repository";
import transporter from "../configs/nodeMailer.config";
import mailPayment from "../common/mailPayment.common";
const orderItemService = new OrderItemService();
const productService = new ProductService();
class PaymentService {
  private _paymentRepository: PaymentRepository;
  private _pointRepository: PointRepository;
  constructor() {
    this._paymentRepository = new PaymentRepository();
    this._pointRepository = new PointRepository();
  }
  async createPayment(payment: IPayment, code: string,pointBody:number) {
    try {
      // Lấy tất cả OrderItem chưa thanh toán theo UserId
      const orderData: any =
        await orderItemService.getDetailOrderItemByUserBefore(payment.userId);
      const quantity = orderData[0].map((item: any) => {
        return {
          id: item.productId,
          quantity: item.quantity,
        };
      });

    //  Lấy tất cả Products theo productId để trừ stock 
      const arrId: number[] = [];
      orderData[0].forEach((item: IOrderItem) => {
        arrId.push(item.productId);
      });
      const needProducts = await productService.getProductByManyId(arrId);
      const newStock: any = [];
      needProducts.forEach((item: any) => {
        quantity.forEach((element: any) => {
          if (item.id === element.id) {
            newStock.push({
              id: item.id,
              stock: item.stock - element.quantity,
            });
          }
        });
      });
    // Lấy point theo userId
    const point = await this._pointRepository.getByUserId(payment.userId)
    const newPoint = Number(point.dataValues.point) - Number(pointBody)
    
    //   Đổi trạng thái OrderItems sang đã thanh toán và thêm codePayment để toạn dữ liệu cho bảng Payment
      const newOrderData: IOrderItem[] = orderData[0].map(
        (item: IOrderItem) => {
          return {
            ...item,
            codePayment: code,
            isPayment: 2,
          };
        }
      );
    // Gởi thông tin thanh toán về mail người dùng
    const htmlElement = await mailPayment(payment,pointBody,orderData[0])
    await transporter.sendMail({
      bcc: payment.email,
      subject: "OTP Authentication",
      html: htmlElement,
    })
      
      await this._paymentRepository.createPayment(payment, newOrderData, newStock,newPoint);
    } catch (error) {
        console.log(error);
    }
  }
  async updatePayment(id:number,status:number):Promise<number[]>{
    return await this._paymentRepository.updatePayment(id,status)
  }
  async getAllPayments():Promise<IPayment>{
    return await this._paymentRepository.getAllPayments()
  }
  async searchPayments(searchValue:string,id?:number){
    return await this._paymentRepository.searchPayments(searchValue,id)
  }
}
export default PaymentService;
