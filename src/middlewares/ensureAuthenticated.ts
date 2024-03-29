import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";
import AppError from '../errors/AppError';
interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request:Request,response:Response,next:NextFunction) : void {

    const authHeader = request.headers.authorization; 

    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }
    const [,token] = authHeader.split(' ') // estou separando por espaço
    try {
        const decoded = verify(token, auth.jwt.secret )

        const { sub } = decoded as TokenPayload; //to forçando o tipo da variavel

        request.user_id = sub

        return next();
          
    } catch {
        throw new AppError('Invalid JWT token',401)
    }
}