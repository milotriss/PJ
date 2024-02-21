import ApiService from "../api/api.service";




class UserRepository {
    private apiService: ApiService;
    constructor(){
        this.apiService = new ApiService()
    }
    async login(formRequest: any):Promise<any> {
      const result =  await this.apiService.POST('/admin/login', formRequest)
      return result
    }
    async getAllUsers(): Promise<any>{
        const result = await this.apiService.GET("/users")
        return result
    }
    async activeUser(id:number){
        return await this.apiService.PATCH('/users/admin',id,{status:1})
    }
    async blockUser(id:number){
        return await this.apiService.PATCH('/users/admin',id,{status:2})
    }
    async searchUsers(searchValue:string){
        return await this.apiService.SEARCH('/users/search',searchValue)
    }
    async createAdmin(formAdmin:any){
        return await this.apiService.POST('/admin/create',formAdmin)
    }
    async getAllAdmins(){
        return await this.apiService.GET("/admin")
    }
    async getUserById(id:number): Promise<any>{
        const result = await this.apiService.GETBYID("users",id)
        return result
    }
    // async patchUserById (id:number,data:any): Promise<any>{
    //     await this.apiService.PATCH("users", id , data)
    // }
    async deleteAdmin(id:number): Promise<any>{
        const result = await this.apiService.DELETE("/admin",id)
        return result
    }
}

export default UserRepository