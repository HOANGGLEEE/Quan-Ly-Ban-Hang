const { createCrudController } = require("./crudFactory");
const { mapKhuyenMai } = require("./retailMappers");

module.exports = createCrudController({
  table: "KHUYENMAI",
  idColumn: "MaKM",
  idParam: "maKM",
  columns: ["MaKM", "TenKM", "MaSP", "NgayBD", "NgayKT"],
  mapper: mapKhuyenMai,
  labels: { table: "khuyến mãi" },
  aliases: { MaKM: "id", TenKM: "name", MaSP: "productId", NgayBD: "startDate", NgayKT: "endDate" },
});
