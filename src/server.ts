
import 'reflect-metadata'
import express from 'express';
import routes from './routes';


import './database'
import upload from './config/upload';
const app = express();
app.use(express.json());
app.use('/files', express.static(upload.directory));//quero servir uma pasta de forma estatica
app.use(routes);

app.listen(3333, () => {
    console.log('✅ Server iniciado na porta 3333!');
});
