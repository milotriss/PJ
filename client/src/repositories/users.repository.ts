import Api from "../apis/api";
import { IUser } from "../types/entities.types";

class UserRepository {
    private _api: Api;
    constructor(){
        this._api = new Api();
    }
    public async register(formRegister:IUser){
        return await this._api.POST('/users/register', formRegister)
    }
    public async login(formLogin:any){
        return await this._api.POST('/users/login', formLogin)
    }
    public async logout(){
        await this._api.LOGOUT('/users/logout')
    }
    public async getUserInfo(id:number):Promise<any>{
        return await this._api.GETBYID('/users',id)
    }
    public async getHistory(id:number){
        return await this._api.GETBYID('/users/history',id)
    }
    public async searchHistoryOrder(userId:number,searchOrder:string):Promise<any>{
        return await this._api.SEARCH('/payments/search',searchOrder,userId)
    }
    public async changePass(newPass:string){
        return await this._api.CPASS(`/users/change-password`,newPass)
    }
    public async createOtp(email:string){
        return await this._api.CREATEOTP(`/users/create-otp`,email)
    }
    public async confirmOtp(confirmOtp:number){
        return await this._api.POST(`/users/confirm-otp`,{otp:confirmOtp})
    }
    public async updateUser(id:number, updateForm:any){
        return await this._api.PATCH(`/users`,id,updateForm)
    }
    public async createFeedback(id:number,data:any){
        return await this._api.POSTID('/users/feedback',id,data)
    }
    public async getFeedbacks(){
        return await this._api.GET('/feedbacks')
    }
}
export default UserRepository;