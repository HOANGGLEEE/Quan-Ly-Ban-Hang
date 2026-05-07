const { ok, fail, rows, execute, first } = require("../utils/sqlHelpers");
const { mapBaoHanh } = require("./retailMappers");

const getAllBaoHanh = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT bh.*, sp.TENSP, kh.TENKH, kh.SDT
      FROM BAOHANH bh
      LEFT JOIN SANPHAM sp ON sp.MASP = bh.MASP
      LEFT JOIN KHACHHANG kh ON kh.MAKH = bh.MAKH
      ORDER BY bh.NGAYKETTHUC DESC, bh.NGAYBATDAU DESC
    `);
    ok(res, data.map(mapBaoHanh), "Lấy bảo hành thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy bảo hành", err.message);
  }
};

const createBaoHanh = async (req, res) => {
  try {
    const id = req.body.MABAOHANH || req.body.id || `BH${Date.now().toString().slice(-10)}`;
    const invoiceId = req.body.MAHDBAN || req.body.invoiceId;
    const productId = req.body.MASP || req.body.productId;
    const customerId = req.body.MAKH || req.body.customerId || null;
    const startDate = req.body.NGAYBATDAU || req.body.startDate || new Date();
    const note = req.body.GHICHU || req.body.note || "";

    if (!invoiceId) return fail(res, 400, "Thiếu mã hóa đơn");
    if (!productId) return fail(res, 400, "Thiếu mã sản phẩm");

    const sold = await first(`
      SELECT TOP 1 h.MAHDBAN, h.MAKH, sp.MASP, ISNULL(sp.THOIGIANBAOHANH, 0) AS THOIGIANBAOHANH
      FROM HOADONBAN h
      INNER JOIN CT_HDB ct ON ct.MAHDBAN = h.MAHDBAN
      INNER JOIN SANPHAM sp ON sp.MASP = ct.MASP
      WHERE h.MAHDBAN = @invoiceId AND sp.MASP = @productId
    `, { invoiceId, productId });
    if (!sold) return fail(res, 400, "Sản phẩm không thuộc hóa đơn này");

    const warrantyMonths = Number(sold.THOIGIANBAOHANH || 0);
    const endDate = req.body.NGAYKETTHUC || req.body.endDate || (warrantyMonths > 0
      ? new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + warrantyMonths))
      : null);
    const status = req.body.TRANGTHAI || req.body.status || (endDate && new Date(endDate) < new Date() ? "Hết hạn" : "Còn bảo hành");

    const affected = await execute(`
      INSERT INTO BAOHANH (MABAOHANH, MASP, MAKH, MAHDBAN, NGAYBATDAU, NGAYKETTHUC, TRANGTHAI, GHICHU)
      VALUES (@id, @productId, @customerId, @invoiceId, @startDate, @endDate, @status, @note)
    `, {
      id,
      productId,
      customerId: customerId || sold.MAKH,
      invoiceId,
      startDate,
      endDate,
      status,
      note,
    });
    ok(res, { affected, id }, "Tạo bảo hành thành công");
  } catch (err) {
    fail(res, 500, "Lỗi tạo bảo hành", err.message);
  }
};

const updateBaoHanhStatus = async (req, res) => {
  try {
    const id = req.body.id || req.body.MABAOHANH;
    const status = req.body.status || req.body.TRANGTHAI;
    const note = req.body.note || req.body.GHICHU || "";
    if (!id || !status) return fail(res, 400, "Thiếu mã bảo hành hoặc trạng thái");

    const affected = await execute(
      "UPDATE BAOHANH SET TRANGTHAI = @status, GHICHU = @note WHERE MABAOHANH = @id",
      { id, status, note },
    );
    ok(res, { affected }, "Cập nhật bảo hành thành công");
  } catch (err) {
    fail(res, 500, "Lỗi cập nhật bảo hành", err.message);
  }
};

module.exports = { getAllBaoHanh, createBaoHanh, updateBaoHanhStatus };
