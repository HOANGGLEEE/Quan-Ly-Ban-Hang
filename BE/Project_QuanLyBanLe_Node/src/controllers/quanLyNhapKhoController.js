const { createCrudController } = require("./crudFactory");
const { mapChiTietNhap, mapNhaCungCap, mapPhieuNhap } = require("./retailMappers");

const phieuNhap = createCrudController({
  table: "PHIEUNHAPKHO",
  idColumn: "MAPHIEUNHAP",
  idParam: "maPhieuNhap",
  columns: ["MAPHIEUNHAP", "MASP", "MANCC", "MANV", "NGAYLAP", "THUEVAT"],
  mapper: mapPhieuNhap,
  labels: { table: "phiếu nhập kho" },
  aliases: {
    MAPHIEUNHAP: "id",
    MASP: "productId",
    MANCC: "supplierId",
    MANV: "employeeId",
    NGAYLAP: "date",
    THUEVAT: "vat",
  },
});

const chiTietNhap = createCrudController({
  table: "CHITIETNHAP",
  idColumn: "MAPHIEUNHAP",
  idParam: "maPhieuNhap",
  columns: ["MAPHIEUNHAP", "MASP", "SOLUONG", "DONGIANHAP", "THANHTIEN", "NGAYNHAPKHO"],
  mapper: mapChiTietNhap,
  labels: { table: "chi tiết nhập" },
  aliases: {
    MAPHIEUNHAP: "receiptId",
    MASP: "productId",
    SOLUONG: "quantity",
    DONGIANHAP: "price",
    THANHTIEN: "total",
    NGAYNHAPKHO: "importDate",
  },
});

const nhaCungCap = createCrudController({
  table: "NHACUNGCAP",
  idColumn: "MANCC",
  idParam: "maNCC",
  columns: ["MANCC", "TENNCC", "DIACHI", "SDT", "EMAIL"],
  mapper: mapNhaCungCap,
  labels: { table: "nhà cung cấp" },
  aliases: { MANCC: "id", TENNCC: "name", DIACHI: "address", SDT: "phone", EMAIL: "email" },
});

module.exports = { phieuNhap, chiTietNhap, nhaCungCap };
