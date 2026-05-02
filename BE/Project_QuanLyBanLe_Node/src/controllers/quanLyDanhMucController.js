const { createCrudController } = require("./crudFactory");
const { mapDanhMuc } = require("./retailMappers");

module.exports = createCrudController({
  table: "DANHMUC",
  idColumn: "MADANHMUC",
  idParam: "madanhmuc",
  columns: ["MADANHMUC", "TENDANHMUC", "MOTA"],
  mapper: mapDanhMuc,
  labels: { table: "danh mục" },
  aliases: { MADANHMUC: "id", TENDANHMUC: "name", MOTA: "description" },
});
