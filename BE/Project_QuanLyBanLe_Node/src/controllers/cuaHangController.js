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
      if (!productId || quantity <= 0) {
        const error = new Error("Thông tin sản phẩm trong đơn hàng không hợp lệ");
        error.statusCode = 400;
        throw error;
      }

      const inventory = await new sql.Request(tx)
        .input("maSP", productId)
        .query("SELECT TENSP, ISNULL(SOLUONGTON, 0) AS SOLUONGTON FROM SANPHAM WITH (UPDLOCK, ROWLOCK) WHERE MASP = @maSP");
      const product = inventory.recordset?.[0];
      if (!product) {
        const error = new Error(`Không tìm thấy sản phẩm ${productId}`);
        error.statusCode = 400;
        throw error;
      }
      if (Number(product.SOLUONGTON) < quantity) {
        const error = new Error(`Sản phẩm ${product.TENSP || productId} chỉ còn ${product.SOLUONGTON} trong kho`);
        error.statusCode = 400;
        throw error;
      }

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
    fail(res, err.statusCode || 500, "Lỗi đặt hàng", err.message);
  }
};

const getOrders = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT dh.*, kh.TENKH, kh.SDT,
             vc.MAVANCHUYEN, vc.DONVIVANCHUYEN, vc.MAVANDON, vc.DIACHIGIAO,
             vc.PHIVANCHUYEN, vc.TRANGTHAI AS TRANGTHAIVANCHUYEN,
             vc.NGAYGIAO_DUKIEN, vc.NGAYGIAO_THUCTE
      FROM DONHANG dh
      LEFT JOIN KHACHHANG kh ON kh.MAKH = dh.MAKH
      LEFT JOIN VANCHUYEN vc ON vc.MADONHANG = dh.MADONHANG
      ORDER BY dh.NGAYDAT DESC
    `);
    ok(res, data.map((item) => ({
      id: item.MADONHANG?.trim?.() || item.MADONHANG,
      customerId: item.MAKH?.trim?.() || item.MAKH,
      customerName: item.TENKH,
      phone: item.SDT,
      date: item.NGAYDAT,
      total: Number(item.TONGTIEN || 0),
      status: item.TRANGTHAI,
      note: item.GHICHU,
      shippingId: item.MAVANCHUYEN?.trim?.() || item.MAVANCHUYEN,
      carrier: item.DONVIVANCHUYEN,
      trackingCode: item.MAVANDON,
      shippingAddress: item.DIACHIGIAO,
      shippingFee: Number(item.PHIVANCHUYEN || 0),
      shippingStatus: item.TRANGTHAIVANCHUYEN,
      expectedDelivery: item.NGAYGIAO_DUKIEN,
      deliveredAt: item.NGAYGIAO_THUCTE,
    })), "Lấy đơn hàng thành công");
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

const updateShipping = async (req, res) => {
  try {
    const { orderId, carrier, trackingCode, shippingStatus, shippingFee, expectedDelivery, deliveredAt } = req.body;
    if (!orderId) return fail(res, 400, "Thiếu mã đơn hàng");

    const affected = await execute(`
      UPDATE VANCHUYEN
      SET DONVIVANCHUYEN = @carrier,
          MAVANDON = @trackingCode,
          TRANGTHAI = @shippingStatus,
          PHIVANCHUYEN = @shippingFee,
          NGAYGIAO_DUKIEN = @expectedDelivery,
          NGAYGIAO_THUCTE = @deliveredAt
      WHERE MADONHANG = @orderId
    `, {
      orderId,
      carrier: carrier || null,
      trackingCode: trackingCode || null,
      shippingStatus: shippingStatus || "Cho giao",
      shippingFee: Number(shippingFee || 0),
      expectedDelivery: expectedDelivery || null,
      deliveredAt: deliveredAt || null,
    });
    ok(res, { affected }, "Cập nhật vận chuyển thành công");
  } catch (err) {
    fail(res, 500, "Lỗi cập nhật vận chuyển", err.message);
  }
};

const cancelOrder = async (req, res) => {
  const tx = new sql.Transaction();
  try {
    const orderId = req.body.orderId || req.query.orderId;
    if (!orderId) return fail(res, 400, "Thiếu mã đơn hàng");

    await tx.begin();
    const orderResult = await new sql.Request(tx)
      .input("orderId", orderId)
      .query("SELECT TOP 1 TRANGTHAI FROM DONHANG WHERE MADONHANG = @orderId");
    const order = orderResult.recordset?.[0];
    if (!order) {
      const error = new Error("Đơn hàng không tồn tại");
      error.statusCode = 404;
      throw error;
    }
    if (String(order.TRANGTHAI || "").toLowerCase().includes("huy")) {
      const error = new Error("Đơn hàng đã hủy trước đó");
      error.statusCode = 400;
      throw error;
    }

    const detailResult = await new sql.Request(tx)
      .input("orderId", orderId)
      .query("SELECT MASP, SOLUONG FROM CHITIETDONHANG WHERE MADONHANG = @orderId");
    for (const item of detailResult.recordset || []) {
      await new sql.Request(tx)
        .input("productId", item.MASP)
        .input("quantity", Number(item.SOLUONG || 0))
        .query("UPDATE SANPHAM SET SOLUONGTON = ISNULL(SOLUONGTON, 0) + @quantity WHERE MASP = @productId");
    }
    await new sql.Request(tx)
      .input("orderId", orderId)
      .query("UPDATE DONHANG SET TRANGTHAI = N'Da huy' WHERE MADONHANG = @orderId");
    await new sql.Request(tx)
      .input("orderId", orderId)
      .query("UPDATE VANCHUYEN SET TRANGTHAI = N'Da huy' WHERE MADONHANG = @orderId");

    await tx.commit();
    ok(res, { orderId }, "Hủy đơn hàng và hoàn tồn kho thành công");
  } catch (err) {
    try { await tx.rollback(); } catch (_rollbackErr) {}
    fail(res, err.statusCode || 500, "Lỗi hủy đơn hàng", err.message);
  }
};

module.exports = { getProducts, createOrder, getOrders, updateOrderStatus, updateShipping, cancelOrder };
