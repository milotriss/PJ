import { Op } from "sequelize";
import sequelize from "../configs/db.config";
import Catalog from "../entities/catalog.entity";
import Product from "../entities/products.entity";
import Rate from "../entities/rates.entity";

class ProductRepository {
  async getAllProducts(catalogId: number): Promise<any> {
    if (catalogId) {
      return await Product.findAll({
        include: { model: Catalog },
        where: {
          catalogId: catalogId,
          isDelete: 1,
        },
      });
    } else {
      return await Product.findAll({
        include: { model: Catalog },
        where: { isDelete: 1 },
      });
    }
  }
  async getAllProductsAdmin(isDelete?: number): Promise<any> {
    if (isDelete) {
      return await Product.findAll({
        include: [{ model: Catalog }, { model: Rate }],
        where: { isDelete: 1 },
      });
    } else {
      return await Product.findAll({
        include: [{ model: Catalog }, { model: Rate }],
      });
    }
  }
  async searchProducts(searchValue: any) {
    return await Product.findAll({
      include: [{ model: Catalog }, { model: Rate }],
      where: {
        name: {
          [Op.like]: `%${searchValue}%`,
        },
        isDelete: 1,
      },
    });
  }
  async getProductById(id: number): Promise<any> {
    return await Product.findAll({
      where: {
        id,
        isDelete: 1,
      },
    });
  }
  async getBestSellers() {
    return await Product.findAll({
      order: [["stock", "ASC"]],
      limit: 4,
    });
  }
  async isDeleteProduct(id: number, isDelete: number): Promise<any> {
    return await Product.update({ isDelete: isDelete }, { where: { id } });
  }
  async createProduct(newProduct: any) {
    await Product.create(newProduct);
  }
  async deleteProduct(id: number): Promise<any> {
    return await Product.destroy({ where: { id } });
  }
  async updateProduct(id: number, newProduct: any): Promise<any> {
    return await Product.update(newProduct, { where: { id } });
  }
  async getProductByManyId(arrId: number[]): Promise<any> {
    const data = await sequelize.query(
      `select products.id, products.stock from products where id in(${arrId}) and products.isDelete = 1`
    );
    return data[0];
  }
}
export default ProductRepository;
