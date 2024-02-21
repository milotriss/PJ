import { formatDate } from "../common/formatDate";
import OrderRepository from "../repositories/order.repositories";
import { IOrder } from "../types/interface";

class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  public async getAllOrders() {
    try {
      const result = await this.orderRepository.getAllOrders();
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async searchHistoryOrder(searchOrder: string): Promise<any> {
    try {
      const result = await this.orderRepository.searchHistoryOrder(searchOrder);
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getDetailHistory(userId: number, codePayment: string) {
    try {
      const result = await this.orderRepository.getDetailHistory(
        userId,
        codePayment
      );
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async changeStatusOrder(id:number,status:number){
    try {
      const result = await this.orderRepository.changeStatusOrder(id,status);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default OrderService;
