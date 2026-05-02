const { ok, fail, rows, execute, sql } = require("../utils/sqlHelpers");
const { mapSanPham } = require("./retailMappers");

const getProducts = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT sp.MASP, sp.TENSP, sp.MAVACH, sp.MOTA, sp.MADANHMUC, dm.TENDANHMUC,
             sp.DONGIA, sp.THUOCTINH, sp.THUEVAT, sp.SOLUONGTON,
             sp.HINHANH, sp.THUONGHIEU, sp.THOIGIANBAOHANH
      FROM SANPHAM sp
      LEFT JOIN DANHMUC dm ON dm.MADANHMUC = sp.MADANHMUC
      WHERE ISNULL(sp.SOLUONGTON, 0) > 0
      ORDER BY sp.TENSP
    `);
    ok(res, data.map(mapSanPham), "Lấy sản phẩm cửa hàng thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy sản phẩm cửa hàng", err.message);
  }
};

const createOrder = async (req, res) => {
  const tx = new sql.Transaction();
  try {
    const customer = req.body.customer || {};
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const shippingAddress = req.body.shippingAddress || customer.address || "";
    const note = req.body.note || "";

    if (!customer.id || !customer.name) return fail(res, 400, "Thiếu thông tin khách hàng");
    if (!items.length) return fail(res, 400, "Giỏ hàng trống");

    const orderId = req.body.orderId || `DH${Date.now().toString().slice(-10)}`;
    const shippingId = `VC${Date.now().toString().slice(-10)}`;

    await tx.begin();

    const customerReq = new sql.Request(tx);
    await customerReq
      .input("maKH", customer.id)
      .input("tenKH", customer.name)
      .input("sdt", customer.phone || null)
      .input("diaChi", customer.address || null)
      .query(`
        IF EXISTS (SELECT 1 FROM KHACHHANG WHERE MAKH = @maKH)
          UPDATE KHACHHANG SET TENKH = @tenKH, SDT = @sdt, DIACHI = @diaChi WHERE MAKH = @maKH
        ELSE
          INSERT INTO KHACHHANG (MAKH, TENKH, SDT, DIACHI) VALUES (@maKH, @tenKH, @sdt, @diaChi)
      `);

    const orderReq = new sql.Request(tx);
    await orderReq
      .input("maDonHang", orderId)
      .input("maKH", customer.id)
      .input("ghiChu", note)
      .query("INSERT INTO DONHANG (MADONHANG, MAKH, NGAYDAT, TONGTIEN, TRANGTHAI, GHICHU) VALUES (@maDonHang, @maKH, GETDATE(), 0, N'Cho xac nhan', @ghiChu)");

    let total = 0;
    for (const item of items) {
      const productId = item.productId || item.id;
      const quantity = Math.max(Number(item.quantity || 0), 1);
      const price = Number(item.price || 0);
      total += quantity * price;

      const detailReq = new sql.Request(tx);
      await detailReq
        .input("maDonHang", orderId)
        .input("maSP", productId)
        .input("soLuong", quantity)
        .input("donGia", price)
        .input("tongTien", quantity * price)
        .query("INSERT INTO CHITIETDONHANG (MADONHANG, MASP, SOLUONG, DONGIA, TONGTIEN) VALUES (@maDonHang, @maSP, @soLuong, @donGia, @tongTien)");

      const stockReq = new sql.Request(tx);
      await stockReq
        .input("maSP", productId)
        .input("soLuong", quantity)
        .query("UPDATE SANPHAM SET SOLUONGTON = ISNULL(SOLUONGTON, 0) - @soLuong WHERE MASP = @maSP");
    }

    const updateOrderReq = new sql.Request(tx);
    await updateOrderReq
      .input("maDonHang", orderId)
      .input("tongTien", total)
      .query("UPDATE DONHANG SET TONGTIEN = @tongTien WHERE MADONHANG = @maDonHang");

    const shippingReq = new sql.Request(tx);
    await shippingReq
      .input("maVanChuyen", shippingId)
      .input("maDonHang", orderId)
      .input("diaChiGiao", shippingAddress)
      .query("INSERT INTO VANCHUYEN (MAVANCHUYEN, MADONHANG, DIACHIGIAO, PHIVANCHUYEN, TRANGTHAI) VALUES (@maVanChuyen, @maDonHang, @diaChiGiao, 0, N'Cho giao')");

    await tx.commit();
    ok(res, { orderId, shippingId, total }, "Đặt hàng thành công");
  } catch (err) {
    try { await tx.rollback(); } catch (_rollbackErr) {}
    fail(res, 500, "Lỗi đặt hàng", err.message);
  }
};

const getOrders = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT dh.*, kh.TENKH, kh.SDT, vc.DIACHIGIAO, vc.TRANGTHAI AS TRANGTHAIVANCHUYEN
      FROM DONHANG dh
      LEFT JOIN KHACHHANG kh ON kh.MAKH = dh.MAKH
      LEFT JOIN VANCHUYEN vc ON vc.MADONHANG = dh.MADONHANG
      ORDER BY dh.NGAYDAT DESC
    `);
    ok(res, data, "Lấy đơn hàng thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy đơn hàng", err.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) return fail(res, 400, "Thiếu mã đơn hàng hoặc trạng thái");
    const affected = await execute("UPDATE DONHANG SET TRANGTHAI = @status WHERE MADONHANG = @orderId", { orderId, status });
    ok(res, { affected }, "Cập nhật đơn hàng thành công");
  } catch (err) {
    fail(res, 500, "Lỗi cập nhật đơn hàng", err.message);
  }
};

module.exports = { getProducts, createOrder, getOrders, updateOrderStatus };
