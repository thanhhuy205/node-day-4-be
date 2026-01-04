const postModel = require("../models/post.model");
const paginationService = require("./pagination.service");

class PostService {
  model = postModel;
  constructor() {
    paginationService.apply(this);
  }
}
const postService = new PostService();
module.exports = postService;
