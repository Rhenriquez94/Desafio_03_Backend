import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: '../.env' });

const { Pool } = pg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
};

// Verificación de la configuración de la base de datos
// console.log({
//     user: DB_USER,
//     host: DB_HOST,
//     database: DB_DATABASE,
//     password: DB_PASSWORD,
//     port: DB_PORT
// });

const pool = new Pool(config);

async function connectDB() {
    try {
        await pool.query("SELECT NOW()");
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

connectDB();

export default pool; 
