import ProductRepository from "../repositories/products.repository";
import { IProduct } from "../types/emtities.types";

class ProductService {
    private _productsRepository: ProductRepository;
    constructor(){
        this._productsRepository = new ProductRepository();
    }
    async getAllProducts(catalogId:number): Promise<IProduct[]>{
        return await this._productsRepository.getAllProducts(catalogId);
    }
    async getAllProductsAdmin(isDelete?:number): Promise<IProduct>{
        return await this._productsRepository.getAllProductsAdmin(isDelete);
    }
    async getProductById(id:number): Promise<IProduct>{
        return await this._productsRepository.getProductById(id);
    }
    async getProductByManyId(arrId:number[]): Promise<IProduct[]>{
        return await this._productsRepository.getProductByManyId(arrId);
    }
    async getBestSellers(){
        return await this._productsRepository.getBestSellers();
    }
    async isDeleteProduct(id:number,isDelete:number): Promise<number[]>{
        return await this._productsRepository.isDeleteProduct(id,isDelete);
    }
    async createProduct(product:IProduct){
        await this._productsRepository.createProduct(product);
    }
    async deleteProduct(id:number): Promise<number>{
        return await this._productsRepository.deleteProduct(id);
    }
    async updateProduct(id:number,product:any): Promise<number[]>{
        return await this._productsRepository.updateProduct(id,product);
    }
    async searchProducts(searchValue:any){
        return await this._productsRepository.searchProducts(searchValue);
    }
    
}
export default ProductService;
