import ProductRepository from "../repositories/product.repositories";
import { IProduct } from "../types/interface";

class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  public async getAllProducts() {
    try {
      const result = await this.productRepository.getAllProducts();
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async isDelete(id: number) {
    try {
      const result = await this.productRepository.isDeleteById(id);
    } catch (error) {
      console.log(error);
    }
  }
  public async return(id: number) {
    try {
      const result = await this.productRepository.return(id);
    } catch (error) {
      console.log(error);
    }
  }
  public async searchProducts(value: string) {
    try {
      const result = await this.productRepository.searchProducts(value);
      if (result.status === 200) {
        return result.data;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async addProduct(data: any) {
    try {
      const result = await this.productRepository.postProduct(data);
      if (result.status === 201) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async updateProduct(id: number, data: any) {
    try {
      const result = await this.productRepository.updateProduct(id, data);
      if (result.status === 200) {
        return 1;
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default ProductService;
