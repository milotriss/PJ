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
exports.uploadProducts = exports.uploadAvatar = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_PASS
});
const storageAvatar = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: 'avatar',
            format: 'jpg'
        };
    })
});
const storageProducts = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: 'products',
            format: 'jpg'
        };
    })
});
const fileFilter = (req, file, cb) => {
    if ((file.mimetype === "image/jpeg") || (file.mimetype === "image/png") || (file.mimetype === "image/jpg")) {
        cb(null, true);
    }
    else {
        cb('File is not type jpg/jpeg/png', false);
    }
};
exports.uploadAvatar = (0, multer_1.default)({ storage: storageAvatar, fileFilter });
exports.uploadProducts = (0, multer_1.default)({ storage: storageProducts, fileFilter });
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
