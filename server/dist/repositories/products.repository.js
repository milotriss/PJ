"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const catalog_entity_1 = __importDefault(require("../entities/catalog.entity"));
const products_entity_1 = __importDefault(require("../entities/products.entity"));
const rates_entity_1 = __importDefault(require("../entities/rates.entity"));
class ProductRepository {
    getAllProducts(catalogId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (catalogId) {
                return yield products_entity_1.default.findAll({
                    include: { model: catalog_entity_1.default },
                    where: {
                        catalogId: catalogId,
                        isDelete: 1,
                    },
                });
            }
            else {
                return yield products_entity_1.default.findAll({
                    include: { model: catalog_entity_1.default },
                    where: { isDelete: 1 },
                });
            }
        });
    }
    getAllProductsAdmin(sort, isDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isDelete) {
                return yield products_entity_1.default.findAll({
                    include: [{ model: catalog_entity_1.default }, { model: rates_entity_1.default }],
                    where: { isDelete: 1 },
                    order: [[sort, 'ASC']]
                });
            }
            else {
                return yield products_entity_1.default.findAll({
                    include: [{ model: catalog_entity_1.default }, { model: rates_entity_1.default }],
                });
            }
        });
    }
    searchProducts(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findAll({
                include: [{ model: catalog_entity_1.default }, { model: rates_entity_1.default }],
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${searchValue}%`,
                    },
                    isDelete: 1,
                },
            });
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findAll({
                where: {
                    id,
                    isDelete: 1,
                },
            });
        });
    }
    getBestSellers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.findAll({
                order: [["stock", "ASC"]],
                limit: 4,
            });
        });
    }
    isDeleteProduct(id, isDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.update({ isDelete: isDelete }, { where: { id } });
        });
    }
    createProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_entity_1.default.create(newProduct);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.destroy({ where: { id } });
        });
    }
    updateProduct(id, newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_entity_1.default.update(newProduct, { where: { id } });
        });
    }
    getProductByManyId(arrId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_config_1.default.query(`select products.id, products.stock from products where id in(${arrId}) and products.isDelete = 1`);
            return data[0];
        });
    }
}
exports.default = ProductRepository;
