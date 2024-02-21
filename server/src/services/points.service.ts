import PointRepository from "../repositories/points.repository";
import { IPoint } from "../types/emtities.types";

class PointService {
    private _pointRepository: PointRepository;
    constructor() {
        this._pointRepository = new PointRepository();
    }
    async getByUserId(userId: number): Promise<IPoint>{
        return await this._pointRepository.getByUserId(userId);
    }
    async updateNewPoint(userId:number,point: number){
        const oldPoint = await this.getByUserId(userId)
        const newPoint = Number(point) + Number(oldPoint.point)
        await this._pointRepository.updateNewPoint(userId,newPoint)
    }
}
export default PointService;