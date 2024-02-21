import express, { NextFunction } from "express";
import AdminService from "../services/admins.service";
const adminService = new AdminService();
const checkUserName = async (req:any | express.Request,res:express.Response, next:NextFunction ) => {
    try {
        const userName = req.body.userName
        const result = await adminService.getAdminUserName(userName)
        if (!result) {
            res.status(404).json('Your UserName is not exist. Please!')
        }else {
            req.user = result
            next()
        }
    } catch (error) {        
        res.status(500).json('Error: Check UserName failed')
    }
}

export default checkUserName;