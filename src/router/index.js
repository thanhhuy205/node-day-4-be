const express = require("express");
const postRouter = require("./post.router");

const router = express.Router();

router.use("/posts", postRouter);

module.exports = router;
