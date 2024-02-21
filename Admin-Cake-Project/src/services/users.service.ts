import UserRepository from "../repositories/user.repositories";
import { IUser } from "../types/interface";

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  public async login(formRequest: any): Promise<any> {
    try {
      const data = await this.userRepository.login(formRequest);
      if (data.status === 200) {
        return data.data.data;
      } else {
        console.log("Login failed");
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        return 0;
      } else {
        return 2;
      }
    }
  }
  public async getAllUsers() {
    try {
      const result = await this.userRepository.getAllUsers();
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // public async getUserById(id: number): Promise<IUser> {
  //   const result = await this.userRepository.getUserById(id);
  //   return result.data;
  // }
  // public async getAllAdmin(): Promise<IUser[]> {
  //   const result = await this.userRepository.getAllUsers();
  //   const admin = result.data.filter((user: IUser) => user.role !== 2);
  //   return admin;
  // }
  // public async getAdminById(id: number): Promise<IUser> {
  //   const result = await this.userRepository.getAdminById(id);
  //   return result.data;
  // }
  public async active(id: number) {
    try {
      const result = await this.userRepository.activeUser(id);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async block(id: number) {
    try {
      const result = await this.userRepository.blockUser(id);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async searchUsers(searchValue: string) {
    try {
      const result = await this.userRepository.searchUsers(searchValue);
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async createAdmin(formAdmin: any) {
    try {
      const result = await this.userRepository.createAdmin(formAdmin);
      if (result.status === 201) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async getAllAdmins() {
    try {
      const result = await this.userRepository.getAllAdmins();
     if (result.status === 200) {
       return result.data;
     }else {
      return 2
     }
    } catch (error) {
      console.log(error);
    }
  }
  public async deleteAdmin(id:number){
    try {
      const result = await this.userRepository.deleteAdmin(id);
      if (result.status === 204) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
