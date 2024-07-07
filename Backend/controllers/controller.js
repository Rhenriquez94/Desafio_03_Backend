import { models } from "../models/querys.js";

const notFound = (req, res) => {
    
    res.status(404).send("Not found");
}

const home = (req, res) => {
  res.send("Hello World desde controller");
};

const create = async (req, res) => {
  try {
    const { titulo, img, descripcion, likes} = req.body;
    const response = await models.create(titulo, img, descripcion, likes);
    res.status(200).send("post created");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPosts= async (req, res)=>{
    try {
        const response = await models.getPosts()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const editPosts = async (req, res) => {
  try {
    const {id } = req.params
    const { titulo, img, descripcion, likes } = req.body;
    const response = await models.editPosts(titulo, img, descripcion, likes, id);
    res.status(200).send('Post edited');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePosts = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await models.deletePosts(id);
      res.status(200).send('Tittle deleted successfully'); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const toggleLike = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await models.getPostById(id);  
      if (!post) {
        return res.status(404).send('Post not found');
      }
      const newLikes = post.likes === 0 ? 1 : 0; 
  
      await models.updateLikes(id, newLikes);
      res.status(200).send(`Post ${newLikes === 1 ? 'liked' : 'unliked'} successfully`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

export const controllers = {
  create,
  deletePosts,
  editPosts,
  getPosts,
  notFound,
  toggleLike,
  home,
 
}