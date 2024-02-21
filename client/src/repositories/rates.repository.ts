import Api from "../apis/api";
import { IRate } from "../types/entities.types";

class RateRepository {
    private _api: Api;
    constructor(){
        this._api = new Api();
    }
    async createRate(id:number,data:any){
        return await this._api.POSTID('/rates',id,data);
    }
    async getRates(productId:number):Promise<any>{
        return await this._api.GETBYID('/rates',productId)
    }
    async deleteRate(rateId:number):Promise<any>{
        return await this._api.DELETE('/rates',rateId)
    }
}
export default RateRepository;