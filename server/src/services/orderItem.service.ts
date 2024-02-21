import OrderItemRepository from "../repositories/orderItem.repository";
import { IOrderItem, IOrderItemSend, IProduct } from "../types/emtities.types";
import ProductService from "./products.service";
const productService = new ProductService();
class OrderItemService {
  private _orderItemRepository: OrderItemRepository;
  constructor() {
    this._orderItemRepository = new OrderItemRepository();
  }
  async checkIsPayment(id: number): Promise<IOrderItem | undefined> {
    return await this._orderItemRepository.checkIsPayment(id);
  }
  async createOrderItem(data: IOrderItemSend) {
    const products: any = await productService.getProductById(data.productId);
    if (products) {
      const orderItem: IOrderItem = {
        userId: data.userId,
        productId: data.productId,
        name: products[0].dataValues.name,
        images: products[0].dataValues.images,
        quantity: data.quantity,
        price: products[0].dataValues.price,
        totalPrice: data.quantity * products[0].dataValues.price,
      };
      await this._orderItemRepository.createOrderItem(orderItem);
      return 1;
    } else {
      return 2;
    }
  }
  async getAllOrderItems(): Promise<IOrderItem[]> {
    return await this._orderItemRepository.getAllOrderItems();
  }
  async deleteOrderItem(id: number) {
    await this._orderItemRepository.deleteOrderItem(id);
  }
  async getDetailOrderItemByUserBefore(userId: number): Promise<IOrderItem[]> {
    return await this._orderItemRepository.getDetailOrderItemByUserBefore(
      userId
    );
  }
  async getHistoryDetail(userId: number, codePayment: string): Promise<any> {
    return await this._orderItemRepository.getHistoryDetail(
      userId,
      codePayment
    );
  }
  async updateOrderItem(id: number, newQuantity: number,newTotalPrice:number) {
    await this._orderItemRepository.updateOrderItem(id, newQuantity,newTotalPrice);
  }
}
export default OrderItemService;
