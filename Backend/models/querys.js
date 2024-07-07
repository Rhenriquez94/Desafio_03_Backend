import pool from '../config/db.js'

const create = async ( titulo, img, descripcion, likes) => {
    const query =
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4);'
    const values = [titulo, img, descripcion, likes];
    try {
      const response = await pool.query(query, values);
      
      if (response.rowCount > 0) {
        return response.rows;
      }
    } catch (error) {
      console.log('Error', error.code, 'Error message',error.message);
    }
  };

  const getPosts = async () => {
    const query = "SELECT * FROM posts";
    try {
      const response = await pool.query(query);
      if (response.rowCount > 0) {
        return response.rows;
      }
    } catch (error) {
      console.log(error);
    }
  };


  const editPosts = async (titulo, img, descripcion, likes, id) => {
    const query = `
      UPDATE posts 
      SET titulo = $1, img = $2, descripcion = $3, likes = $4 
      WHERE id = $5`;
    const values = [titulo, img, descripcion, likes, id];
    const result = await pool.query(query, values);
    return result;
  };

  const deletePosts = async (id) => {
    try {
      const query = "DELETE FROM posts WHERE id = $1;";
      const values = [id];
      const response = await pool.query(query, values);
      if(response.rowCount > 0) {
        return response.rows
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getPostById = async (id) => {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  const updateLikes = async (id, likes) => {
    const query = 'UPDATE posts SET likes = $1 WHERE id = $2';
    const values = [likes, id];
    await pool.query(query, values);
  };
  
  export const models = {
    create,
    getPosts,
    editPosts,
    deletePosts,
    getPostById,
    updateLikes
  }