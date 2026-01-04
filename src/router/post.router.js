const express = require("express");
const postController = require("../controller/post.controller");

const postRouter = express.Router();

postRouter.get("/", postController.getPostsController);
postRouter.get("/:id", postController.getPostsUserController);

module.exports = postRouter;
