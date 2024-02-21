import Point from "../entities/point.entity";

class PointRepository {
    async getByUserId(userId: number): Promise<any>{
        return await Point.findOne({where:{userId}})
    }
    async updateNewPoint(id:number,newPoint:number){
        await Point.update({point: newPoint },{where:{userId:id}})
    }
}
export default PointRepository;