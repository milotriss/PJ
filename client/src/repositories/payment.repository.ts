import Api from "../apis/api";

class PaymentRepository {
    private _api: Api;
    constructor(){
        this._api = new Api();
    }
    async createPayment(id:number,data:any){
        return await this._api.POSTID('/payments',id, data);
    }
}
export default PaymentRepository;