const pool = require("../config/database");
const { PER_PAGE } = require("../constant/pagination");

class PostModel {
  async findAll({ offset = 0, per_page = PER_PAGE, filters = {} }) {
    try {
      let where = "";
      const params = [];
      const user_id = filters.user_id;

      if (user_id) {
        where = "WHERE posts.user_id = ?";
        params.push(Number(user_id));
      }

      params.push(Number(per_page));
      params.push(Number(offset));
      console.log(per_page);
      console.log(offset);

      const [rows] = await pool.query(
        `
      SELECT * FROM posts
      ${where}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
        params
      );

      return rows;
    } catch {
      return [];
    }
  }

  async count(filters = {}) {
    try {
      let where = "";
      const params = [];
      const user_id = filters.user_id;
      if (user_id) {
        where = " WHERE posts.user_id = ? ";
        params.push(Number(user_id));
      }

      const [total] = await pool.query(
        `
      SELECT COUNT(*) AS total
      FROM posts
       ${where}
      `,
        params
      );

      return total[0].total;
    } catch {
      return 0;
    }
  }
}

module.exports = new PostModel();
