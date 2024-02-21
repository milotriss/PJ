import Api from "../apis/api";

class ProductsRepository {
    private _api: Api;
    constructor(){
        this._api = new Api();
    }
    async getAllProducts(catalogId?:number){
        return await this._api.GETBYID('/products/getall',catalogId);
    }
    async getProduct(productId:number){
        return await this._api.GETBYID('/products',productId);
    }
    async searchProducts(searchValue:string){
        return await this._api.SEARCH('/products/search',searchValue);
    }
    async getBestSellers(){
        return await this._api.GET('/products/best-sellers');
    }
}
export default ProductsRepository;