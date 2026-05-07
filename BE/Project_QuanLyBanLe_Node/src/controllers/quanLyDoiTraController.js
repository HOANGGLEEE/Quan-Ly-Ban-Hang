const { ok, fail, rows, sql } = require("../utils/sqlHelpers");
const { mapDoiTra } = require("./retailMappers");

const getAllDoiTra = async (_req, res) => {
  try {
    const data = await rows(`
      SELECT dt.*, sp.TENSP
      FROM DOITRA dt
      LEFT JOIN SANPHAM sp ON sp.MASP = dt.MASP
      ORDER BY dt.NGAYTAO DESC
    `);
    ok(res, data.map(mapDoiTra), "Lấy phiếu đổi trả thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy phiếu đổi trả", err.message);
  }
};

const createDoiTra = async (req, res) => {
  const tx = new sql.Transaction();
  try {
    const invoiceId = req.body.invoiceId || req.body.MAHDBAN;
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const reason = req.body.reason || req.body.LYDO || "";
    const type = req.body.type || req.body.HINHTHUC || "Trả hàng";
    const status = req.body.status || req.body.TRANGTHAI || "Đã xử lý";

    if (!invoiceId) return fail(res, 400, "Thiếu mã hóa đơn");
    if (!items.length) return fail(res, 400, "Phiếu đổi trả phải có ít nhất một sản phẩm");

    await tx.begin();

    const invoiceResult = await new sql.Request(tx)
      .input("invoiceId", invoiceId)
      .query("SELECT TOP 1 MAHDBAN, MAKH FROM HOADONBAN WHERE MAHDBAN = @invoiceId");
    const invoice = invoiceResult.recordset?.[0];
    if (!invoice) {
      const error = new Error("Hóa đơn gốc không tồn tại");
      error.statusCode = 400;
      throw error;
    }

    const created = [];
    for (const item of items) {
      const productId = item.productId || item.MASP;
      const quantity = Number(item.returnQuantity ?? item.quantity ?? item.SOLUONG ?? 0);
      const price = Number(item.price ?? item.DONGIA ?? 0);
      if (!productId || quantity <= 0) {
        const error = new Error("Sản phẩm đổi trả không hợp lệ");
        error.statusCode = 400;
        throw error;
      }

      const soldResult = await new sql.Request(tx)
        .input("invoiceId", invoiceId)
        .input("productId", productId)
        .query("SELECT ISNULL(SUM(SOLUONG), 0) AS SOLD FROM CT_HDB WHERE MAHDBAN = @invoiceId AND MASP = @productId");
      const soldQuantity = Number(soldResult.recordset?.[0]?.SOLD || 0);
      if (!soldQuantity) {
        const error = new Error(`Sản phẩm ${productId} không thuộc hóa đơn gốc`);
        error.statusCode = 400;
        throw error;
      }

      const returnedResult = await new sql.Request(tx)
        .input("invoiceId", invoiceId)
        .input("productId", productId)
        .query("SELECT ISNULL(SUM(SOLUONG), 0) AS RETURNED FROM DOITRA WHERE MAHDBAN = @invoiceId AND MASP = @productId");
      const returnedQuantity = Number(returnedResult.recordset?.[0]?.RETURNED || 0);
      if (returnedQuantity + quantity > soldQuantity) {
        const error = new Error(`Số lượng đổi/trả của ${productId} vượt số lượng còn được xử lý`);
        error.statusCode = 400;
        throw error;
      }

      const id = `DT${Date.now().toString().slice(-9)}${created.length}`;
      const value = quantity * price;
      await new sql.Request(tx)
        .input("id", id)
        .input("invoiceId", invoiceId)
        .input("productId", productId)
        .input("customerId", invoice.MAKH)
        .input("quantity", quantity)
        .input("reason", reason)
        .input("type", type)
        .input("value", value)
        .input("status", status)
        .query(`
          INSERT INTO DOITRA (MADOITRA, MAHDBAN, MASP, MAKH, SOLUONG, LYDO, HINHTHUC, GIATRI, NGAYTAO, TRANGTHAI)
          VALUES (@id, @invoiceId, @productId, @customerId, @quantity, @reason, @type, @value, GETDATE(), @status)
        `);

      await new sql.Request(tx)
        .input("productId", productId)
        .input("quantity", quantity)
        .query("UPDATE SANPHAM SET SOLUONGTON = ISNULL(SOLUONGTON, 0) + @quantity WHERE MASP = @productId");

      created.push({ id, productId, quantity, value });
    }

    await tx.commit();
    ok(res, { invoiceId, items: created, total: created.reduce((sum, item) => sum + item.value, 0) }, "Tạo phiếu đổi trả thành công");
  } catch (err) {
    try { await tx.rollback(); } catch (_rollbackErr) {}
    fail(res, err.statusCode || 500, "Lỗi tạo phiếu đổi trả", err.message);
  }
};

module.exports = { getAllDoiTra, createDoiTra };
