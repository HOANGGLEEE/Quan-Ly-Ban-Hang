const { createCrudController } = require("./crudFactory");
const { mapChiTietNhap, mapNhaCungCap, mapPhieuNhap } = require("./retailMappers");

const phieuNhap = createCrudController({
  table: "PHIEUNHAPKHO",
  idColumn: "MAPHIEUNHAP",
  idParam: "maPhieuNhap",
  columns: ["MAPHIEUNHAP", "MANCC", "MANV", "NGAYLAP"],
  mapper: mapPhieuNhap,
  labels: { table: "phiếu nhập kho" },
  aliases: { MAPHIEUNHAP: "id", MANCC: "supplierId", MANV: "employeeId", NGAYLAP: "date" },
});

const chiTietNhap = createCrudController({
  table: "CT_PNK",
  idColumn: "MAPHIEUNHAP",
  idParam: "maPhieuNhap",
  columns: ["MAPHIEUNHAP", "MASP", "SOLUONG", "DONGIANHAP", "THANHTIEN"],
  mapper: mapChiTietNhap,
  labels: { table: "chi tiết nhập" },
  aliases: { MAPHIEUNHAP: "receiptId", MASP: "productId", SOLUONG: "quantity", DONGIANHAP: "price", THANHTIEN: "total" },
});

const nhaCungCap = createCrudController({
  table: "NHACUNGCAP",
  idColumn: "MaNCC",
  idParam: "maNCC",
  columns: ["MaNCC", "TenNCC", "DiaChi", "SDT", "EMAIL"],
  mapper: mapNhaCungCap,
  labels: { table: "nhà cung cấp" },
  aliases: { MaNCC: "id", TenNCC: "name", DiaChi: "address", SDT: "phone", EMAIL: "email" },
});

module.exports = { phieuNhap, chiTietNhap, nhaCungCap };
