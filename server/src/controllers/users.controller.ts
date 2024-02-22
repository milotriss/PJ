import express from "express";
import UserService from "../services/users.service";
import { IUser, IUserInfo } from "../types/emtities.types";
import { uploadAvatar } from "../configs/multerCloudinary.config";
import bcrypt from "bcryptjs";
import checkEmail from "../middlewares/checkEmail.middleware";
import transporter from "../configs/nodeMailer.config";
import {Random} from 'random-js';
import { Authorization } from "../middlewares/auth.middleware";
const random = new Random();
const userController = express.Router();
const userService = new UserService();
userController
  // GetAllUsers
  .get("/",Authorization ,async (req: express.Request, res: express.Response) => {
    try {
      const data = await userService.getAllUsers();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Get all users failed: SERVER");
    }
  })
  .get('/search',Authorization,async (req: express.Request, res: express.Response) => {
    try {
      const searchValue = String(req.query.search)
      const data = await userService.searchUsers(searchValue);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Get all users failed: SERVER");
    }
  })
  // RegisterUser
  .post("/register", async (req: express.Request, res: express.Response) => {
    try {
      const registerForm: IUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };
      await userService.register(registerForm);
      res.status(201).json("Register user success");
    } catch (error) {
      res.status(500).json("Register user failed: SERVER");
    }
  })
  // UpdateStatusUser ADMIN
  .patch("/admin/:id", Authorization,async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const statusUser = Number(req.body.status);
      console.log(statusUser);
      console.log(id);
      
      
      const data = await userService.changeStatusUser(id, statusUser);
      if (data[0] === 0) {
        res.status(404).json("Not found");
      } else {
        res.status(200).json("Updated successfully");
      }
    } catch (error) {
      res.status(500).json("Update user failed: SERVER");
    }
  })
  // Login
  .post("/login",checkEmail ,async (req: express.Request, res: express.Response) => {
    try {
      const loginForm = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await userService.login(loginForm);
      if (result === 1) {
        res.status(400).json("Password incorrect");
      } else {
        res.status(200).json({ mgs: "login success", data: result });
      }
    } catch (error) {
      res.status(500).json("Login failed: server");
    }
  })
  // Logout
  .get("/logout",Authorization ,async (req: express.Request, res: express.Response) => {
    try {
      req.session.destroy((error: any) => {
        if (error) {
          res.send("Error logging out");
        } else {
          res.status(200).json("Logout successfully");
        }
      });
    } catch (error) {
      res.status(500).json("Logout failed: SERVER");
    }
  })

  // ForgotPassword
  // GetOTP
  .post("/create-otp", checkEmail, async (req: any, res: express.Response) => {
    try {
      const userInfo = req.user;
      req.session.user = userInfo.dataValues;
      const randomNumber = random.integer(10000,99999)
      const salt = bcrypt.genSaltSync(9);
      const hashedOtp = bcrypt.hashSync(String(randomNumber), salt);
      await transporter.sendMail({
        bcc: userInfo.email,
        subject: "OTP Authentication",
        html: 
        `
          <p>OTP: ${randomNumber}</p>
          <p>OTP only lasts for 5 minutes, Tks!</p>
        `
      })
      res.cookie("otp", hashedOtp, {
        expires: new Date(Date.now() + 30000000),
        httpOnly: true,
      });
      res
        .status(201)
        .json({ msg: "OTP has been sent to your email",randomNumber});
    } catch (error) {
      res.status(500).json("Create OTP failed: SERVER");
    }
  })
  // ConfirmOTP
  .post("/confirm-otp", async (req:any, res: express.Response) => {
    try {
      const otpCookie = req.cookies.otp;
      console.log(otpCookie);
      
      const bodyOtp = req.body.otp;
      console.log(bodyOtp);
      
      const checkOTP = bcrypt.compareSync(String(bodyOtp), otpCookie);
      if (checkOTP) {
        res.status(200).json("Confirm OTP successfully");
      } else {
        res.status(400).json("Confirm OTP failed");
      }
    } catch (error) {
      
      res.status(500).json("Confirm OTP failed: SERVER");
    }
  })
  // Change password
  .patch("/change-password", async (req: any, res: express.Response) => {
    try {
      const user = req.session.user;
      const id = user.id;
      const password: string = String(req.body.password);
      const data = { password: password };
      const result = await userService.updateUserPassword(id, data);
      if (result[0] === 0) {
        res.status(404).json("Not found");
      } else {
        req.session.destroy((error: any) => {
          if (error) {
            res.json("Error logging out");
          } else {
            res.status(200).json("Updated successfully");
          }
        });
      }
    } catch (error) {
      res.status(500).json("Error updating: SERVER");
    }
  })
  // GetUserById
  .get("/:id",async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const data = await userService.getUserById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Get user failed: SERVER");
    }
  })
  // UpdateUserInfo
  .patch(
    "/:id",Authorization,
    uploadAvatar.single("avatar"),
    async (req: express.Request, res: express.Response) => {
      try {
        
        const file = req.file as Express.Multer.File;
        const id = Number(req.params.id);
        let updateForm;
        if (file) {
          updateForm = {
            ...req.body,
            avatar: file.path,
          };
        } else {
          updateForm = { ...req.body };
        }
        const data = await userService.updateUser(id, updateForm);
        if (data[0] === 0) {
          res.status(404).json("Not found");
        } else {
          res.status(200).json("Updated successfully");
        }
      } catch (error) {
        res.status(500).json("Update user failed: SERVER");
      }
    }
  )
  .get("/history/:id",Authorization, async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const data = await userService.getHistoryById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Get history User: SERVER");
    }
  })
  .post(
    "/feedback/:id",Authorization,
    async (req: express.Request, res: express.Response) => {
      try {
        const data = {
          userId: Number(req.params.id),
          content: req.body.content,
          emotion: Number(req.body.emotion),
        };
        await userService.createFeedback(data);
        res.status(201).json("Create Feedback Successfully");
      } catch (error) {
        res.status(500).json("Create Feedback: SERVER");
      }
    }
  );
export default userController;
