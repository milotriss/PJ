import Api from "../apis/api";

class OrderItemRepository {
    private _api: Api;
    constructor(){
        this._api = new Api();
    }
    async createOrderItem(data:any){
        return await this._api.POST('/order-items/create', data);
    }
    async getCart(id:number){
        return await this._api.GETBYID('/order-items/cart',id)
    }
    async deleteItem(id:number){
        return await this._api.DELETE('/order-items',id)
    }
    async updateQuantity(id:number, newData:any){
        return await this._api.PATCH('/order-items',id,newData)
    }
    async getPoints(userId:number){
        return await this._api.GETBYID('/points',userId)
    }
    async getDetailHistory(userId:number,codePayment:string){
        return await this._api.GETBYID('/order-items/history/detail',userId,codePayment)
    }
}
export default OrderItemRepository;