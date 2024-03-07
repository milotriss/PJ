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
const express_1 = __importDefault(require("express"));
const products_service_1 = __importDefault(require("../services/products.service"));
const multerCloudinary_config_1 = require("../configs/multerCloudinary.config");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const productService = new products_service_1.default();
const productsController = express_1.default.Router();
productsController
    // GetAllProducts
    .get('/getall/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catalogId = Number(req.params.id);
        const data = yield productService.getAllProducts(catalogId);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get all products: SERVER");
    }
}))
    .get('/getall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sort = String(req.query.sort);
        const isDelete = Number(req.params.isDelete);
        const data = yield productService.getAllProductsAdmin(sort, isDelete);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get all products: SERVER");
    }
}))
    .get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchValue = req.query.search || "";
        const result = yield productService.searchProducts(searchValue);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Search Product: SERVER');
    }
}))
    // CreateProduct
    .post('/create', auth_middleware_1.Authorization, multerCloudinary_config_1.uploadProducts.single('products'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagePath = req.file;
        const newProduct = {
            catalogId: Number(req.body.catalogId),
            name: req.body.name,
            price: Number(req.body.price),
            desc: req.body.desc,
            images: imagePath.path,
            ingredients: req.body.ingredients,
            allergens: req.body.allergens,
            stock: Number(req.body.stock)
        };
        yield productService.createProduct(newProduct);
        res.status(201).json('Product created successfully');
    }
    catch (error) {
        res.status(500).json('Create product: SERVER');
    }
}))
    // IsDeleteProduct
    .patch('/is-delete/:id', auth_middleware_1.Authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const isDelete = Number(req.body.isDelete);
        const result = yield productService.isDeleteProduct(id, isDelete);
        if (result[0] === 0) {
            res.status(400).json('Not found');
        }
        else {
            res.status(200).json('IsDelete successfully');
        }
    }
    catch (error) {
        res.status(500).json('IsDelete product: SERVER');
    }
}))
    // DeleteProduct
    .delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield productService.deleteProduct(id);
        if (result) {
            res.status(200).json("Delete successfully");
        }
        else {
            res.status(404).json("Not Found");
        }
    }
    catch (error) {
        res.status(500).json("Delete Product: SERVER");
    }
}))
    // UpdateProduct
    .patch('/:id', auth_middleware_1.Authorization, multerCloudinary_config_1.uploadProducts.single('products'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const imagePath = req.file;
        let data;
        if (imagePath) {
            data = Object.assign(Object.assign({}, req.body), { images: imagePath.path });
        }
        else {
            data = Object.assign({}, req.body);
        }
        const result = yield productService.updateProduct(id, data);
        if (result[0] === 0) {
            res.status(404).json("Not FOund");
        }
        else {
            res.status(200).json("Update successfully");
        }
    }
    catch (error) {
        res.status(500).json("Update Product: SERVER");
    }
}))
    // GetBestSeller
    .get('/best-sellers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productService.getBestSellers();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json("Get bestseller products: SERVER");
    }
}))
    // GetOneProduct
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const data = yield productService.getProductById(id);
        res.status(200).json(data[0].dataValues);
    }
    catch (error) {
        res.status(500).json("Get product: SERVER");
    }
}));
exports.default = productsController;
