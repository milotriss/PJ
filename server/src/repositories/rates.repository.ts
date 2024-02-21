import Rate from "../entities/rates.entity";
import UserInfo from "../entities/userInfo.entity";
import User from "../entities/users.entity";

class RateRepository {
  async createRate(data: any) {
    return await Rate.create(data);
  }
  async deleteRate(rateId: number): Promise<any> {
    return await Rate.destroy({ where: { id: rateId } });
  }
  async getAllRates(): Promise<any> {
    return await Rate.findAll();
  }
  async getRateById(productId: number): Promise<any> {
    return await Rate.findAll({
      include: [
        {
          model: User,
          attributes: ["lastName", "firstName"],
          include: [{ model: UserInfo, attributes: ["avatar"] }],
        },
      ],
      where: { productId: productId },
    });
  }
}
export default RateRepository;
