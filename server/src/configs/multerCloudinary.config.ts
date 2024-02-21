import {v2 as cloudinary} from 'cloudinary';
import express from 'express'
import dotenv from 'dotenv'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_PASS
})

const storageAvatar = new CloudinaryStorage({
    cloudinary,
    params: async (req:express.Request,file:any) => {
        return {
            folder: 'avatar',
            format: 'jpg'
        }
    }
})
const storageProducts = new CloudinaryStorage({
    cloudinary,
    params: async (req:express.Request,file:any) => {
        return {
            folder: 'products',
            format: 'jpg'
        }
    }
})
const fileFilter = (req:express.Request, file:any, cb:Function) => {
    if ((file.mimetype === "image/jpeg") || (file.mimetype === "image/png") || (file.mimetype === "image/jpg")) {
        cb(null,true)
        
    }else {
        cb('File is not type jpg/jpeg/png',false)
    }
}

export const uploadAvatar = multer({storage:storageAvatar,fileFilter})
export const uploadProducts = multer({storage:storageProducts,fileFilter})


// Cú pháp sử dụng middleware upload ảnh 
// Phần uplaod dùng cloudinary up 1 ảnh
// server
//   .post(
//     "/",
//     uploadCloud.single("file"),  **file là key gởi từ body
//     (req: express.Request, res: express.Response) => {
//       const file = req.file as Express.Multer.File;
//       res.json(file.path);
//     }
//   )

// Phần upload dùng cloudinary up nhiều ảnh
//   .post(
//     "/uploads",
//     uploadCloud.array("files", 3), **files là key gởi từ body
//     (req: express.Request, res: express.Response) => {
//       const file = req.files as Express.Multer.File[];
//       const fileNeed = file.map((item: Express.Multer.File) => {
//         return item.path;
//       });
//       res.json(fileNeed);
//     }
//   );