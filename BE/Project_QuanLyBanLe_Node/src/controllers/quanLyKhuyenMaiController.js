const { createCrudController } = require("./crudFactory");
const { mapKhuyenMai } = require("./retailMappers");

module.exports = createCrudController({
  table: "KHUYENMAI",
  idColumn: "MAKM",
  idParam: "maKM",
  columns: ["MAKM", "TENKM", "MASP", "NGAYBATDAU", "NGAYKETTHUC"],
  mapper: mapKhuyenMai,
  labels: { table: "khuyến mãi" },
  aliases: {
    MAKM: "id",
    TENKM: "name",
    MASP: "productId",
    NGAYBATDAU: "startDate",
    NGAYKETTHUC: "endDate",
  },
});
