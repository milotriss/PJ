import AdminRepository from "../repositories/admins.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class AdminService {
  private _adminRepository: AdminRepository;
  constructor() {
    this._adminRepository = new AdminRepository();
  }
  async login(loginForm: any) {
    try {
      const result: any = await this._adminRepository.login(loginForm.userName);
      const checkPassword = bcrypt.compareSync(
        loginForm.password,
        result.dataValues.password
      );
      const { password, createAt, updateAt, ...rest } = result.dataValues;
      const accessToken = jwt.sign(rest, String(process.env.JWT_SECRET));
      if (checkPassword) {
        return {
          admin: rest,
          accessToken,
        };
      } else {
        return 1;
      }
    } catch (error) {
      console.log("Logic login Failed");
    }
  }
  async createAdmin(createForm:any) {
    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(createForm.password, salt);
    const data = {
      ...createForm,
      password: hashedPassword,
    };
    await this._adminRepository.createAdmin(data);
  }
  async getAdminUserName(email: string): Promise<any> {
    return await this._adminRepository.getAdminUserName(email);
  }
  async getAllAdmins(){
    return await this._adminRepository.getAllAdmins()
  }
  async deleteAdmin(id:number){
    return await this._adminRepository.deleteAdmin(id)
  }
  
}
export default AdminService;
