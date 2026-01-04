const { PER_PAGE } = require("../constant/pagination");
const postService = require("../service/post.service");

class PostController {
  async getPostsController(req, res) {
    const current_page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || PER_PAGE;

    const result = await postService.pagination({
      current_page,
      per_page,
      filters: {},
    });

    return res.pagination({ rows: result.data, pagination: result.pagination });
  }

  async getPostsUserController(req, res) {
    const user_id = req.params.id;
    const current_page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || PER_PAGE;
    const result = await postService.pagination({
      current_page,
      per_page,
      filters: {
        user_id,
      },
    });

    return res.pagination({ rows: result.data, pagination: result.pagination });
  }
}
const postController = new PostController();
module.exports = postController;
