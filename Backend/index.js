import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: '123', 
  port: 5432 
});


app.get('/posts', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM posts');
    const posts = result.rows;
    client.release();
    res.json(posts);
  } catch (err) {
    console.error('Error al obtener posts', err);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});


app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, img, descripcion, likes]
    );
    const newPost = result.rows[0];
    client.release();
    res.json(newPost);
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ error: 'Error' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor "Like Me" corriendo en http://localhost:${port}`);
});
