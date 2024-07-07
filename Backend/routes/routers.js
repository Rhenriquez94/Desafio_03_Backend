import express from "express";
import { controllers } from "../controllers/controller.js";
const router = express.Router();


router.post("/posts", controllers.create);

router.get("/posts", controllers.getPosts); 

router.put('/posts/:id', controllers.editPosts);

router.put('/posts/:id/like', controllers.toggleLike);

router.delete("/posts/:id", controllers.deletePosts);

router.get("*", controllers.notFound);

export default router;