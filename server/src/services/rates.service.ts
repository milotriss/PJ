import RateRepository from "../repositories/rates.repository";
import { IRate } from "../types/emtities.types";

class RateService {
    private _rateRepository: RateRepository;
    constructor() {
        this._rateRepository = new RateRepository();
    }
    async createRate(data: IRate) {
        await this._rateRepository.createRate(data);
    }
    async deleteRate(rateId:number):Promise<number>{
        return await this._rateRepository.deleteRate(rateId);
    }
    async getAllRates():Promise<IRate[]>{
        return await this._rateRepository.getAllRates();
    }
    async getRateById(productId:number){
        return await this._rateRepository.getRateById(productId);
    }
}

export default RateService;