const { createCrudController } = require("./crudFactory");
const { mapNhanVien } = require("./retailMappers");

module.exports = createCrudController({
  table: "NHANVIEN",
  idColumn: "MANV",
  idParam: "maNV",
  columns: ["MANV", "TENNV", "SDT", "DIACHI"],
  mapper: mapNhanVien,
  labels: { table: "nhân viên" },
  aliases: { MANV: "id", TENNV: "name", SDT: "phone", DIACHI: "address" },
});
