
import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';


import './database'
import upload from './config/upload';
import AppError from './errors/AppError';
const app = express();
app.use(express.json());
app.use('/files', express.static(upload.directory));//quero servir uma pasta de forma estatica
app.use(routes);

app.use((err: Error,request:Request, response:Response, next:NextFunction)=> {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
})

app.listen(3333, () => {
    console.log('✅ Server iniciado na porta 3333!');
});
