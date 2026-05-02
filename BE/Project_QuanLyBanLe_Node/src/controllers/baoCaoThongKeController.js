const { ok, fail, rows } = require("../utils/sqlHelpers");
const { mapChiTietBan, mapChiTietNhap, mapDanhMuc, mapHoaDon, mapKhuyenMai, mapPhieuNhap, mapSanPham } = require("./retailMappers");

const wrap = (query, mapper, message) => async (_req, res) => {
  try {
    ok(res, (await rows(query)).map(mapper), message);
  } catch (err) {
    fail(res, 500, message.replace("Lấy", "Lỗi lấy"), err.message);
  }
};

module.exports = {
  getAllDanhMuc: wrap("SELECT MADANHMUC, TENDANHMUC, MOTA FROM DANHMUC", mapDanhMuc, "Lấy danh mục thành công"),
  getAllSanPham: wrap("SELECT * FROM SANPHAM", mapSanPham, "Lấy sản phẩm thành công"),
  getAllKhuyenMai: wrap("SELECT * FROM KHUYENMAI", mapKhuyenMai, "Lấy khuyến mãi thành công"),
  getAllPhieuNhapKho: wrap("SELECT * FROM PHIEUNHAPKHO", mapPhieuNhap, "Lấy phiếu nhập thành công"),
  getAllChiTietNhap: wrap("SELECT * FROM CT_PNK", mapChiTietNhap, "Lấy chi tiết nhập thành công"),
  getAllHoaDon: wrap("SELECT * FROM HOADONBAN", mapHoaDon, "Lấy hóa đơn thành công"),
  getAllChiTietBan: wrap("SELECT * FROM CT_HDB", mapChiTietBan, "Lấy chi tiết bán thành công"),
};
