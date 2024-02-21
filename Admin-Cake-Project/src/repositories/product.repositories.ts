
import ApiService from "../api/api.service";
import { IProduct } from "../types/interface";

class ProductRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllProducts(): Promise<any> {
    const result:any = await this.apiService.GET("/products/getall");
    return result
  }
  async isDeleteById(id:number){
    return await this.apiService.PATCH('/products/is-delete',id,{isDelete:2})
  }
  async return(id:number){
    return await this.apiService.PATCH('/products/is-delete',id,{isDelete:1})
  }
  
  async postProduct(data:IProduct){
    return await this.apiService.POST('/products/create',data)
  }
  async searchProducts(value:string){
    return await this.apiService.SEARCH('/products/search',value)
  }
  async updateProduct(id:number,data:any){
    return await this.apiService.PATCH('/products',id,data)
  }
}


export default ProductRepository;
