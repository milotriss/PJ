import { ICartItem } from "../components/detail/detail";
import OrderItemRepository from "../repositories/orderItems.repository";
import ProductsRepository from "../repositories/products.repository";
import { ICart } from "../types/entities.types";

class OrderItemService {
  private _orderItemRepository: OrderItemRepository;
  private _productRepository: ProductsRepository;
  constructor() {
    this._orderItemRepository = new OrderItemRepository();
    this._productRepository = new ProductsRepository();
  }
  async getCart(userId: number) {
    const data = await this._orderItemRepository.getCart(userId);
    return data.data;
  }
  async createOrderItem(data: any) {
    try {
      const orderItem = await this.getCart(data.userId);
      if (orderItem.length === 0) {
        await this._orderItemRepository.createOrderItem(data);
        return 1;
      } else {
        const checkProduct = orderItem.find(
          (item: ICart) => item.productId === data.productId
        );
        if (checkProduct) {
          return 2;
        } else {
          await this._orderItemRepository.createOrderItem(data);
          return 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteItem(id: number) {
    try {
      const data = await this._orderItemRepository.deleteItem(id);
      if (data.status === 204) {
        return 1;
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        return 2;
      }
    }
  }
  async updateQuantity(cart: ICart, quantity: number) {
    try {
      const product = await this._productRepository.getProduct(cart.productId);
      if (product.data.stock < quantity) {
        return 0;
      } else {
        const newTotalPrice = cart.price * quantity;
        const newData = {
          quantity,
          newTotalPrice,
        };
        const result = await this._orderItemRepository.updateQuantity(
          Number(cart.id),
          newData
        );
        if (result.status === 204) {
          return 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getPoints(userId: number) {
    try {
      const data = await this._orderItemRepository.getPoints(userId);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDetailHistory(userId: number, codePayment: string) {
    try {
      const result = await this._orderItemRepository.getDetailHistory(
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
}
export default OrderItemService;
