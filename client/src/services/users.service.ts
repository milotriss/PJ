import { ILogin } from "../components/login/login";
import UserRepository from "../repositories/users.repository";
import { IUser } from "../types/entities.types";

class UserService {
    private _userRepository: UserRepository;
    constructor(){
        this._userRepository = new UserRepository()
    }
    public async register(formRegister:IUser){
        try {
            const result = await this._userRepository.register(formRegister)
            if (result.status === 201) {
                return 1
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    public async login(formLogin:ILogin){
        return await this._userRepository.login(formLogin)
    }
    public async logout(){
        await this._userRepository.logout()
    }
    public async getUserInfo(id: number) {
        try {
            const data = await this._userRepository.getUserInfo(id);
            return data.data[0]
        } catch (error) {
            console.log(error);
            
        }
    }
    public async getHistory(id: number){
        try {
            const data = await this._userRepository.getHistory(id);
            if (data.status === 200) {
                return data.data
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
        }
    }
    public async searchHistoryOrder(userId:number,searchOrder: string){
        try {
            const result = await this._userRepository.searchHistoryOrder(userId,searchOrder)
            if (result.status === 200) {
                return result.data
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
        }
    }
    public async changePass(newPass:string){
        try {
            
            const result = await this._userRepository.changePass(newPass);
            console.log(result);
            if (result.status === 200) {
                return 1
            }else{
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    public async createOtp(email:string){
        try {
            
            const result = await this._userRepository.createOtp(email)
            if (result.status === 201) {
                return 1
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
        }
    }
    public async confirmOtp(confirmOtp:number){
        try {
            
            const result = await this._userRepository.confirmOtp(confirmOtp)
            if (result.status === 200) {
                return 1
            }else {
                return 2
            }
        } catch (error) {
            console.log(error); 
        }
    }
    public async updateUser(id:number,updateForm:any){
        try {
            const result = await this._userRepository.updateUser(id,updateForm)
            if (result.status === 200) {
                return 1
            }else{
                return 2
            }
        } catch (error) {
            console.log(error);
        }
    }
    public async createFeedback(id:number,data:any){
        try {
            const result = await this._userRepository.createFeedback(id,data)
            if (result.status === 201) {
                return 1
            }else{
                return 2
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    public async getFeedbacks(){
        try {
            const result = await this._userRepository.getFeedbacks()
            if (result.status === 200) {
                return result.data
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default UserService;