import express, { NextFunction } from "express";
import UserService from "../services/users.service";
const userService = new UserService();
const checkEmail = async (req:any | express.Request,res:express.Response, next:NextFunction ) => {
    try {
        const email = req.body.email
        const result = await userService.getUserEmail(email)
        if (!result) {
            res.status(404).json('Your Email is not exist. Please!')
        }else {
            req.user = result
            next()
        }
    } catch (error) {        
        res.status(500).json('Error: Check email failed')
    }
}

export default checkEmail;