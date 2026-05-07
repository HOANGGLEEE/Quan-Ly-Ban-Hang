const { ok, fail, rows } = require("../utils/sqlHelpers");
const { mapChiTietBan, mapChiTietNhap, mapDanhMuc, mapHoaDon, mapKhuyenMai, mapPhieuNhap, mapSanPham } = require("./retailMappers");

const wrap = (query, mapper, message) => async (_req, res) => {
  try {
    ok(res, (await rows(query)).map(mapper), message);
  } catch (err) {
    fail(res, 500, message.replace("Lấy", "Lỗi lấy"), err.message);
  }
};

const getReportParams = (req) => ({
  fromDate: req.query.fromDate || req.query.tuNgay || "1900-01-01",
  toDate: req.query.toDate || req.query.denNgay || "2999-12-31",
});

const getRevenueReport = async (req, res) => {
  try {
    const { fromDate, toDate } = getReportParams(req);
    const data = await rows(`
      SELECT CONVERT(date, h.NGAYLAP) AS reportDate,
             COUNT(DISTINCT h.MAHDBAN) AS invoiceCount,
             SUM(ISNULL(ct.SOLUONG, 0) * ISNULL(ct.DONGIA, 0)) AS revenue,
             SUM(ISNULL(h.THUEVAT, 0)) AS vat,
             SUM(ISNULL(h.GIAMGIA, 0)) AS discount
      FROM HOADONBAN h
      LEFT JOIN CT_HDB ct ON ct.MAHDBAN = h.MAHDBAN
      WHERE CONVERT(date, h.NGAYLAP) BETWEEN @fromDate AND @toDate
      GROUP BY CONVERT(date, h.NGAYLAP)
      ORDER BY reportDate
    `, { fromDate, toDate });
    ok(res, data.map((item) => ({
      label: item.reportDate,
      note: `${item.invoiceCount} hóa đơn`,
      value: Number(item.revenue || 0),
      vat: Number(item.vat || 0),
      discount: Number(item.discount || 0),
    })), "Lấy báo cáo doanh thu thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy báo cáo doanh thu", err.message);
  }
};

const getBestSellingReport = async (req, res) => {
  try {
    const { fromDate, toDate } = getReportParams(req);
    const data = await rows(`
      SELECT ct.MASP, sp.TENSP, SUM(ISNULL(ct.SOLUONG, 0)) AS quantity,
             SUM(ISNULL(ct.SOLUONG, 0) * ISNULL(ct.DONGIA, 0)) AS revenue
      FROM CT_HDB ct
      INNER JOIN HOADONBAN h ON h.MAHDBAN = ct.MAHDBAN
      LEFT JOIN SANPHAM sp ON sp.MASP = ct.MASP
      WHERE CONVERT(date, h.NGAYLAP) BETWEEN @fromDate AND @toDate
      GROUP BY ct.MASP, sp.TENSP
      ORDER BY quantity DESC, revenue DESC
    `, { fromDate, toDate });
    ok(res, data.map((item) => ({
      label: item.TENSP || item.MASP,
      note: item.MASP,
      value: Number(item.quantity || 0),
      revenue: Number(item.revenue || 0),
    })), "Lấy báo cáo sản phẩm bán chạy thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy báo cáo bán chạy", err.message);
  }
};

const getInventoryReport = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT sp.MASP, sp.TENSP, dm.TENDANHMUC, ISNULL(sp.SOLUONGTON, 0) AS stock,
             ISNULL(sp.DONGIA, 0) AS price,
             ISNULL(sp.SOLUONGTON, 0) * ISNULL(sp.DONGIA, 0) AS inventoryValue
      FROM SANPHAM sp
      LEFT JOIN DANHMUC dm ON dm.MADANHMUC = sp.MADANHMUC
      ORDER BY stock ASC, sp.TENSP
    `);
    ok(res, data.map((item) => ({
      label: item.TENSP || item.MASP,
      note: item.TENDANHMUC || item.MASP,
      value: Number(item.stock || 0),
      price: Number(item.price || 0),
      inventoryValue: Number(item.inventoryValue || 0),
    })), "Lấy báo cáo tồn kho thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy báo cáo tồn kho", err.message);
  }
};

module.exports = {
  getAllDanhMuc: wrap("SELECT MADANHMUC, TENDANHMUC, MOTA FROM DANHMUC", mapDanhMuc, "Lấy danh mục thành công"),
  getAllSanPham: wrap("SELECT * FROM SANPHAM", mapSanPham, "Lấy sản phẩm thành công"),
  getAllKhuyenMai: wrap("SELECT * FROM KHUYENMAI", mapKhuyenMai, "Lấy khuyến mãi thành công"),
  getAllPhieuNhapKho: wrap("SELECT * FROM PHIEUNHAPKHO", mapPhieuNhap, "Lấy phiếu nhập thành công"),
  getAllChiTietNhap: wrap("SELECT * FROM CHITIETNHAP", mapChiTietNhap, "Lấy chi tiết nhập thành công"),
  getAllHoaDon: wrap("SELECT * FROM HOADONBAN", mapHoaDon, "Lấy hóa đơn thành công"),
  getAllChiTietBan: wrap("SELECT * FROM CT_HDB", mapChiTietBan, "Lấy chi tiết bán thành công"),
  getRevenueReport,
  getBestSellingReport,
  getInventoryReport,
};
