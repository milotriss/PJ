import UserRepository from "../repositories/users.repository";
import { IFeedback, ILogin, IUser, IUserInfo } from "../types/emtities.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PaymentRepository from "../repositories/payment.repository";
import FeedbackRepository from "../repositories/feedback.repository";
dotenv.config();

class UserService {
  private _userRepository: UserRepository;
  private _paymentRepository: PaymentRepository;
  private _feedbackRepository: FeedbackRepository;
  constructor() {
    this._userRepository = new UserRepository();
    this._paymentRepository = new PaymentRepository();
    this._feedbackRepository = new FeedbackRepository();
  }

  async getAllUsers(): Promise<any> {
    return await this._userRepository.getAllUsers();
  }
  async getUserEmail(email: string): Promise<any> {
    return await this._userRepository.getUserEmail(email);
  }
  async searchUsers(searchValue: string) : Promise<any>{
    return await this._userRepository.searchUsers(searchValue)
  }
  async getUserById(id: number): Promise<any> {
    return await this._userRepository.getUserById(id);
  }
  async register(registerForm: IUser){
    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(registerForm.password, salt);
    const data = {
      ...registerForm,
      password: hashedPassword,
    };
    await this._userRepository.register(data);
  }
  async login(loginForm: ILogin) {
    try {
      const result: any = await this._userRepository.login(loginForm.email);
      const checkPassword = bcrypt.compareSync(
        loginForm.password,
        result.dataValues.password
      );
      const { password, createAt, updateAt, ...rest } = result.dataValues;
      const accessToken = jwt.sign(rest, String(process.env.JWT_SECRET));
      if (checkPassword) {
        return {
          user: rest,
          accessToken,
        };
      } else {
        return 1;
      }
    } catch (error) {
      console.log("Logic login Failed");
    }
  }
  async updateUser(id: number, updateForm: IUser): Promise<number[]> {
    return await this._userRepository.updateUser(id, updateForm);
  }
  async updateUserPassword(id: number, data: any): Promise<number[]> {
    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const password = { password: hashedPassword };
    return await this._userRepository.updatePassword(id, password);
  }
  async changeStatusUser(id: number, statusUser: number): Promise<number[]> {
    return await this._userRepository.changeStatusUser(id, statusUser);
  }
  async getHistoryById(id: number): Promise<any> {
    return await this._paymentRepository.getPaymentsWithUser(id);
  }
  async createFeedback(data: IFeedback) {
    await this._feedbackRepository.createFeedback(data);
  }
}

export default UserService;
