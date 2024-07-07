import express from 'express';
import router from './routes/routers.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();  // Asegúrate de que esto esté en la parte superior del archivo

const app = express();
const PORT = process.env.PORT || 3000;

// // Verificación de variables de entorno
// console.log({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/', router);

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));
