import RateRepository from "../repositories/rates.repository";
import { IRate } from "../types/entities.types";

class RateService {
    private _rateRepository: RateRepository;
    constructor(){
        this._rateRepository = new RateRepository();
    }
    async createRate(id:number,data: IRate) {
        try {
           const result = await this._rateRepository.createRate(id,data);
            if (result.status === 201) {
                return 1
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    async getRates(productsId:number){
        try {
            const result = await this._rateRepository.getRates(productsId)
            if (result.status === 200) {
                return result.data;
            }else{
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    async deleteRate(rateId:number){
        try {
            const result = await this._rateRepository.deleteRate(rateId)
            if (result.status === 204) {
                return 1
            }else{
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}
export default RateService;