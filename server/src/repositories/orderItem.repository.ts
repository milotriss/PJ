import sequelize from "../configs/db.config";
import OrderItem from "../entities/orderItems.entity";

class OrderItemRepository {
  async createOrderItem(data: any) {
    await OrderItem.create(data);
  }
  async getAllOrderItems(): Promise<any> {
    return await OrderItem.findAll();
  }
  async getDetailOrderItemByUserBefore(userId: number): Promise<any> {
   const data = await sequelize.query(`select * from orderItems where userId = ${userId} and orderItems.isPayment = 1`);
   return data
  }
  async checkIsPayment(id: number): Promise<any> {
    return await OrderItem.findOne({
      where: {
        id,
        isPayment: 1, 
      }
    });
  }
  async deleteOrderItem(id: number){
    await OrderItem.destroy({where:{id}});
  }
  async getHistoryDetail(userId: number,codePayment:string): Promise<any> {
    return await OrderItem.findAll({
      where: {
        userId,
        codePayment,
      },
      attributes:['images','name','quantity','price','totalPrice']
    })
  }
  async updateOrderItem(id:number,newQuantity:number,newTotalPrice:number){
    await OrderItem.update({quantity:newQuantity,totalPrice:newTotalPrice},{where:{id}})
  }
}
export default OrderItemRepository;
