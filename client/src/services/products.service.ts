import ProductsRepository from "../repositories/products.repository";

class ProductService {
    private _productsRepository: ProductsRepository;
    constructor(){
        this._productsRepository = new ProductsRepository();
    }
    async getAllProducts(catalogId?:number){
        return await this._productsRepository.getAllProducts(catalogId);
    }
    async getProduct(productId:number){
        try {
            const result =  await this._productsRepository.getProduct(productId);
            if (result.status === 200) {
                return result.data;
            }else {
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    async searchProducts(searchValue:string){
        try {
            const data = await this._productsRepository.searchProducts(searchValue);
            if (data.status === 200) {
                return data.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getBestSellers(){
        try {
            const result = await this._productsRepository.getBestSellers()
            if (result.status === 200) {
                return result.data;
            }else{
                return 2
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}
export default ProductService;