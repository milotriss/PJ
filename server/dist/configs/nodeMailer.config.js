"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_MAIN,
        pass: process.env.MAIL_PASS
    }
});
exports.default = transporter;
// Cú pháp để gởi mail
// app.get('/send', async (req:express.Request, res:express.Response) => {
//     try {
//         await transporter.sendMail({
//             bcc: '',
//             subject:'',
//             html: '',
//         })
//         res.json("Send mail successfully")
//     } catch (error) {
//         res.json("Send mail failed")
//     }
// })
