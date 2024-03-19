import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Profile } from "../db/models";
require('dotenv').config();

declare global {
    namespace Express {
      interface Request {
        token: any
      }
    }
  }
const ACCESS_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;

 const verifyToken = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.header('Authorization');
        if (token== undefined || token == ''){
            return res.status(401).json({ error: 'Access denied' });
        
        }
        if(typeof token !=undefined){
            const bearer = token.split(' ');
            const bearerToken= bearer[1];
            const decoded = jwt.verify(bearerToken, ACCESS_TOKEN_PRIVATE_KEY);
            req.token = decoded;
        }
        const validUser = await Profile.findByPk(req.token._id);
        if(validUser?.profile_id == req.token._id){
            next();
        }
        else{
            res.status(401).json({ error: 'aunthorized token' });
        }
        
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
 export default verifyToken;

