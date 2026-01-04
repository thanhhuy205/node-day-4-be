const { PER_PAGE, MAX_LIMIT } = require("../constant/pagination");

class PaginationService {
  apply(service) {
    if (!service?.model) {
      throw new Error("Bắt buộc service phải có model");
    }

    service.pagination = async function ({
      current_page = 1,
      per_page = PER_PAGE,
      filters = {},
    }) {
      per_page = Math.min(per_page, MAX_LIMIT);
      const offset = (current_page - 1) * per_page;

      const [total, rows] = await Promise.all([
        this.model.count(filters),
        this.model.findAll({ filters, offset, limit: per_page }),
      ]);
      const count = total;
      return {
        data: rows,
        pagination: {
          current_page,
          total: count,
          per_page,
          from: rows.length ? offset + 1 : 0,
          to: rows.length ? offset + rows.length : 0,
          last_page: Math.ceil(count / per_page),
        },
      };
    };

    return service;
  }
}
const paginationService = new PaginationService();
module.exports = paginationService;
