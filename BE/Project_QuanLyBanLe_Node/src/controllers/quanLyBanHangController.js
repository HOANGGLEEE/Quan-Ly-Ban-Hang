const { ok, fail, rows, execute, sql } = require("../utils/sqlHelpers");
const {
  mapChiTietBan,
  mapDanhMuc,
  mapHoaDon,
  mapKhachHang,
  mapSanPham,
  mapThanhToan,
} = require("./retailMappers");

const getAllSanPham = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT sp.MASP, sp.TENSP, sp.MAVACH, sp.MOTA, sp.MADANHMUC, dm.TENDANHMUC,
             sp.DONGIA, sp.THUOCTINH, sp.THUEVAT, sp.SOLUONGTON
      FROM SANPHAM sp LEFT JOIN DANHMUC dm ON dm.MADANHMUC = sp.MADANHMUC
    `);
    ok(res, data.map(mapSanPham), "Lấy danh sách sản phẩm thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy sản phẩm", err.message);
  }
};

const getAllDanhMuc = async (_req, res) => {
  try {
    ok(res, (await rows("SELECT MADANHMUC, TENDANHMUC, MOTA FROM DANHMUC")).map(mapDanhMuc));
  } catch (err) {
    fail(res, 500, "Lỗi lấy danh mục", err.message);
  }
};

const getAllKhachHang = async (_req, res) => {
  try {
    ok(res, (await rows("SELECT MaKH, TenKH, SDT, DiaChi FROM KHACHHANG")).map(mapKhachHang));
  } catch (err) {
    fail(res, 500, "Lỗi lấy khách hàng", err.message);
  }
};

const getKhachHangById = async (req, res) => {
  try {
    const maKH = req.query.maKH || req.query.id;
    if (!maKH) return fail(res, 400, "Thiếu maKH");
    const data = await rows("SELECT MaKH, TenKH, SDT, DiaChi FROM KHACHHANG WHERE MaKH = @maKH", { maKH });
    if (!data.length) return fail(res, 404, "Không tìm thấy khách hàng");
    ok(res, data.map(mapKhachHang));
  } catch (err) {
    fail(res, 500, "Lỗi lấy khách hàng", err.message);
  }
};

const insertKhachHang = async (req, res) => {
  try {
    const maKH = req.body.MaKH || req.body.MAKH || req.body.id;
    const tenKH = req.body.TenKH || req.body.TENKH || req.body.name;
    const sdt = req.body.SDT || req.body.phone;
    const diaChi = req.body.DiaChi || req.body.DIACHI || req.body.address;
    if (!maKH || !tenKH) return fail(res, 400, "Thiếu mã hoặc tên khách hàng");
    const affected = await execute(
      "INSERT INTO KHACHHANG (MaKH, TenKH, SDT, DiaChi) VALUES (@maKH, @tenKH, @sdt, @diaChi)",
      { maKH, tenKH, sdt, diaChi },
    );
    ok(res, { affected }, "Thêm khách hàng thành công");
  } catch (err) {
    fail(res, 500, "Lỗi thêm khách hàng", err.message);
  }
};

const getAllHoaDon = async (_req, res) => {
  try {
    const invoices = (await rows("SELECT * FROM HOADONBAN")).map(mapHoaDon);
    const details = (await rows("SELECT ct.*, sp.TENSP AS TenSP FROM CT_HDB ct LEFT JOIN SANPHAM sp ON sp.MASP = ct.MASP")).map(mapChiTietBan);
    const detailByInvoice = details.reduce((grouped, item) => {
      grouped[item.invoiceId] = grouped[item.invoiceId] || [];
      grouped[item.invoiceId].push(item);
      return grouped;
    }, {});
    ok(res, invoices.map((invoice) => ({ ...invoice, items: detailByInvoice[invoice.id] || [] })));
  } catch (err) {
    fail(res, 500, "Lỗi lấy hóa đơn", err.message);
  }
};

const getHoaDonById = async (req, res) => {
  try {
    const maHoaDon = req.query.maHoaDon || req.query.maHDB || req.query.id;
    if (!maHoaDon) return fail(res, 400, "Thiếu mã hóa đơn");
    const data = await rows("SELECT * FROM HOADONBAN WHERE MAHDBAN = @maHoaDon", { maHoaDon });
    if (!data.length) return fail(res, 404, "Không tìm thấy hóa đơn");
    ok(res, data.map(mapHoaDon));
  } catch (err) {
    fail(res, 500, "Lỗi lấy hóa đơn", err.message);
  }
};

const getAllChiTietBan = async (_req, res) => {
  try {
    ok(res, (await rows("SELECT * FROM CT_HDB")).map(mapChiTietBan));
  } catch (err) {
    fail(res, 500, "Lỗi lấy chi tiết bán", err.message);
  }
};

const getChiTietBanByHoaDon = async (req, res) => {
  try {
    const maHDB = req.query.maHDB || req.query.maHoaDon || req.query.id;
    if (!maHDB) return fail(res, 400, "Thiếu maHDB");
    const data = await rows("SELECT * FROM CT_HDB WHERE MAHDBAN = @maHDB", { maHDB });
    ok(res, data.map(mapChiTietBan));
  } catch (err) {
    fail(res, 500, "Lỗi lấy chi tiết bán", err.message);
  }
};

const insertHoaDon = async (req, res) => {
  const tx = new sql.Transaction();
  try {
    const items = req.body.listjson_chitietban || req.body.items || [];
    const maHDBan = req.body.MAHDBAN || req.body.id || `HD${Date.now()}`;
    const manv = req.body.MANV || req.body.employeeId || null;
    const makh = req.body.MAKH || req.body.customerId || null;
    const ngayLap = req.body.NGAYLAP || req.body.date || new Date();
    const thueVat = Number(req.body.THUEVAT ?? req.body.vat ?? 0);
    const giamGia = Number(req.body.GIAMGIA ?? req.body.discount ?? 0);
    const tongTien = items.reduce((sum, item) => sum + Number(item.DONGIA ?? item.price ?? 0) * Number(item.SOLUONG ?? item.quantity ?? 0), 0);

    await tx.begin();
    const request = new sql.Request(tx);
    await request
      .input("maHDBan", maHDBan)
      .input("manv", manv)
      .input("makh", makh)
      .input("ngayLap", ngayLap)
      .input("tongTien", tongTien + thueVat - giamGia)
      .input("thueVat", thueVat)
      .input("giamGia", giamGia)
      .query("INSERT INTO HOADONBAN (MAHDBAN, MANV, MAKH, NGAYLAP, TONGTIENHANG, THUEVAT, GIAMGIA) VALUES (@maHDBan, @manv, @makh, @ngayLap, @tongTien, @thueVat, @giamGia)");

    for (const item of items) {
      const detail = new sql.Request(tx);
      const masp = item.MASP || item.productId || item.id;
      const soLuong = Number(item.SOLUONG ?? item.quantity ?? 0);
      const donGia = Number(item.DONGIA ?? item.price ?? 0);
      await detail
        .input("maHDBan", maHDBan)
        .input("masp", masp)
        .input("soLuong", soLuong)
        .input("donGia", donGia)
        .input("tongTien", soLuong * donGia)
        .query("INSERT INTO CT_HDB (MAHDBAN, MASP, SOLUONG, DONGIA, TONGTIEN) VALUES (@maHDBan, @masp, @soLuong, @donGia, @tongTien)");
    }
    await tx.commit();
    ok(res, { id: maHDBan }, "Thêm hóa đơn thành công");
  } catch (err) {
    try { await tx.rollback(); } catch (_rollbackErr) {}
    fail(res, 500, "Lỗi thêm hóa đơn", err.message);
  }
};

const insertThanhToan = async (req, res) => {
  try {
    const id = req.body.MaThanhToan || req.body.id || `TT${Date.now()}`;
    const maHDBan = req.body.MaHDBan || req.body.invoiceId;
    const phuongThuc = req.body.PhuongThuc || req.body.method;
    const soTien = req.body.SoTienThanhToan ?? req.body.amount ?? 0;
    const ngay = req.body.NgayThanhToan || req.body.date || new Date();
    const trangThai = req.body.TrangThai || req.body.status || "Đã thanh toán";
    const affected = await execute(
      "INSERT INTO THANHTOAN (MaThanhToan, MaHDBan, PhuongThuc, SoTienThanhToan, NgayThanhToan, TrangThai) VALUES (@id, @maHDBan, @phuongThuc, @soTien, @ngay, @trangThai)",
      { id, maHDBan, phuongThuc, soTien, ngay, trangThai },
    );
    ok(res, { affected, id }, "Thêm thanh toán thành công");
  } catch (err) {
    fail(res, 500, "Lỗi thêm thanh toán", err.message);
  }
};

const getAllThanhToan = async (_req, res) => {
  try {
    ok(res, (await rows("SELECT * FROM THANHTOAN")).map(mapThanhToan));
  } catch (err) {
    fail(res, 500, "Lỗi lấy thanh toán", err.message);
  }
};

module.exports = {
  getAllSanPham,
  getAllDanhMuc,
  getAllKhachHang,
  getKhachHangById,
  insertKhachHang,
  getAllHoaDon,
  getHoaDonById,
  getAllChiTietBan,
  getChiTietBanByHoaDon,
  insertHoaDon,
  insertThanhToan,
  getAllThanhToan,
};
