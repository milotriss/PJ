import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const Authorization = (req:any, res:express.Response, next: express.NextFunction) => {
    try {
        const authorization = req.header('Authorization');
        console.log(authorization);
        
        if (!authorization) {
            return res.status(401).json('Invalid authorization');
        }
        const tokenString = authorization.split(' ');
        
        if (tokenString.length !== 2 || tokenString[0] !== 'Bearer') {
            return res.status(401).json('Invalid authorization');
        }
        const token = tokenString[1];
        
        jwt.verify(token,String(process.env.JWT_SECRET), (err:any, user:any) => {
            if (err) {
                return res.status(401).json('Invalid authorization');
            }

            req.user = user;
            next();
        })
    } catch (error) {
        res.status(500).json('Request failed')
    }
}