import ApiService from "../api/api.service"
class OrderRepository {
    private apiService: ApiService
    constructor(){
        this.apiService = new ApiService()
    }
    async getAllOrders(): Promise<any> {
        const result = await this.apiService.GET("/payments")
        return result
    }
    async patchStatusOrder(id:number, data:number) {
       await this.apiService.PATCH('orders', id, data)
    }
    public async searchHistoryOrder(searchOrder:string):Promise<any>{
        return await this.apiService.SEARCH('/payments/search',searchOrder)
    }
    async getDetailHistory(userId:number,codePayment:string){
        return await this.apiService.GETBYID('/order-items/history/detail',userId,codePayment)
    }
    async changeStatusOrder(id:number, status:number){
        return await this.apiService.PATCH('payments/update', id, {status:status})
    }
}
export default OrderRepository