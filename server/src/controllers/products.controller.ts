import express from 'express';
import ProductService from '../services/products.service';
import { uploadAvatar, uploadProducts } from '../configs/multerCloudinary.config';
import { IProduct } from '../types/emtities.types';
const productService = new ProductService()
const productsController = express.Router();

productsController
// GetAllProducts
.get('/getall/:id', async (req:express.Request, res:express.Response) => {
    try {
        const catalogId = Number(req.params.id);
        const data = await productService.getAllProducts(catalogId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json("Get all products: SERVER")
    }
})
.get('/getall', async (req:express.Request, res:express.Response) => {
    try {
        const isDelete = Number(req.params.isDelete)
        const data = await productService.getAllProductsAdmin(isDelete)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json("Get all products: SERVER")
    }
})
.get('/search', async (req:express.Request, res:express.Response) =>{
    try {
        const searchValue: any = req.query.search || ""
        const result = await productService.searchProducts(searchValue)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json('Search Product: SERVER')
    }
})
// CreateProduct
.post('/create',uploadProducts.single('products'),async (req:express.Request, res:express.Response)=> {
    try {
        const imagePath = req.file as Express.Multer.File
        const newProduct:IProduct = {
            catalogId: Number(req.body.catalogId),
            name: req.body.name,
            price: Number(req.body.price),
            desc: req.body.desc,
            images: imagePath.path,
            ingredients: req.body.ingredients,
            allergens: req.body.allergens,
            stock: Number(req.body.stock)
        }
        await productService.createProduct(newProduct)
        res.status(201).json('Product created successfully')
    } catch (error) {
        res.status(500).json('Create product: SERVER')
    }
})
// IsDeleteProduct
.patch('/is-delete/:id', async (req:express.Request, res:express.Response) =>{
    try {
        const id = Number(req.params.id)
        const isDelete = Number(req.body.isDelete)
        const result:number[] = await productService.isDeleteProduct(id,isDelete)
        if (result[0] === 0) {
            res.status(400).json('Not found')
        }else {
            res.status(200).json('IsDelete successfully')
        }
    } catch (error) {
        res.status(500).json('IsDelete product: SERVER')
    }
})

// DeleteProduct
.delete('/:id', async (req:express.Request, res:express.Response)=>{
    try {
        const id = Number(req.params.id)
        const result = await productService.deleteProduct(id)
        if (result) {
            res.status(200).json("Delete successfully")
        }else {
            res.status(404).json("Not Found")
        }
    } catch (error) {
        res.status(500).json("Delete Product: SERVER")
    }
})
// UpdateProduct
.patch('/:id',uploadProducts.single('products') ,async (req:express.Request, res:express.Response)=>{
    try {
        const id = Number(req.params.id)
        const imagePath = req.file as Express.Multer.File
        let data
        if (imagePath) {
            data = {
                ...req.body,
                 images: imagePath.path
            }
        }else {
            data = {...req.body}
        }
        const result = await productService.updateProduct(id,data)
        if (result[0] === 0) {
            res.status(404).json("Not FOund")
        }else {
            res.status(200).json("Update successfully")
        }
    } catch (error) {
        res.status(500).json("Update Product: SERVER")
    }
})
// GetBestSeller
.get('/best-sellers', async (req:express.Request, res:express.Response)=>{
    try {
        const data = await productService.getBestSellers()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json("Get bestseller products: SERVER")
    }
})
// GetOneProduct
.get('/:id', async (req:express.Request, res:express.Response)=>{
    try {
        const id = Number(req.params.id)
        const data:any = await productService.getProductById(id)
        res.status(200).json(data[0].dataValues)
    } catch (error) {
        res.status(500).json("Get product: SERVER")
    }
})



export default productsController;