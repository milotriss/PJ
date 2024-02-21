import User from "../entities/users.entity";
import UserInfo from "../entities/userInfo.entity";
import sequelize from "../configs/db.config";
import Payment from "../entities/payments.entity";
import Point from "../entities/point.entity";
import { Op } from "sequelize";

class UserRepository {
  async getAllUsers(): Promise<any> {
    return await User.findAll({
      include: { model: UserInfo },
    });
  }
  async getUserById(id: number): Promise<any> {
    const result = await User.findAll({
      include: [
        { model: UserInfo, where: { userId: id } },
        { model: Point, where: { userId: id } },
      ],
    });
    return result;
  }
  async getUserEmail(data: string): Promise<any> {
    const result = await User.findOne({ where: { email: data } });
    return result;
  }
  async searchUsers(searchValue: string):Promise<any>  {
    return await User.findAll({
      include: { model: UserInfo },
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${searchValue}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${searchValue}%`,
            },
          },
        ],
      },
    });
  }
  async register(user: any):Promise<any> {
    await User.create(user);
  }
  async updateUser(id: number, user: any): Promise<number[]> {
    return await UserInfo.update(user, { where: { userId: id } });
  }
  async updatePassword(id: number, data: any): Promise<number[]> {
    return await User.update(data, { where: { id } });
  }
  async changeStatusUser(id: number, status: number): Promise<number[]> {
    return await User.update({ status: status }, { where: { id } });
  }
  async login(email: string): Promise<any> {
    return await User.findOne({ where: { email: email } });
  }
}
export default UserRepository;
