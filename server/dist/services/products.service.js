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
const products_repository_1 = __importDefault(require("../repositories/products.repository"));
class ProductService {
    constructor() {
        this._productsRepository = new products_repository_1.default();
    }
    getAllProducts(catalogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.getAllProducts(catalogId);
        });
    }
    getAllProductsAdmin(sort, isDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.getAllProductsAdmin(sort, isDelete);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.getProductById(id);
        });
    }
    getProductByManyId(arrId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.getProductByManyId(arrId);
        });
    }
    getBestSellers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.getBestSellers();
        });
    }
    isDeleteProduct(id, isDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.isDeleteProduct(id, isDelete);
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._productsRepository.createProduct(product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.deleteProduct(id);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.updateProduct(id, product);
        });
    }
    searchProducts(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._productsRepository.searchProducts(searchValue);
        });
    }
}
exports.default = ProductService;
