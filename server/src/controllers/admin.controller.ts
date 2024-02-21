import express from 'express';
import AdminService from '../services/admins.service';
import checkUserName from '../middlewares/checkUserName.middleware';

const adminController = express.Router()
const adminService = new AdminService();

adminController
// Login
.post("/login",checkUserName,async (req: express.Request, res: express.Response) => {
    try {
      const loginForm = {
        userName: req.body.userName,
        password: req.body.password,
      };
      const result = await adminService.login(loginForm);
      if (result === 1) {
        res.status(400).json("Password incorrect");
      } else {
        res.status(200).json({ mgs: "login success", data: result });
      }
    } catch (error) {
      res.status(500).json("Login failed: server");
    }
  })
// Create Admin
.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const registerForm:any = {
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: req.body.password,
      };
      await adminService.createAdmin(registerForm);
      res.status(201).json("Register user success");
    } catch (error) {        
      res.status(500).json("Register user failed: SERVER");
    }
  })
.get('/', async (req: express.Request, res: express.Response)=>{
    try {
        const result = await adminService.getAllAdmins()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json("Get All admins: SERVER");
    }
})
.delete('/:id', async (req: express.Request, res: express.Response)=>{
    try {
        const id = Number(req.params.id);
        await adminService.deleteAdmin(id);
        res.status(204).json("Delete Admin Success");
    } catch (error) {
        res.status(500).json("Delete Admin: SERVER");
    }
})
  
export default adminController