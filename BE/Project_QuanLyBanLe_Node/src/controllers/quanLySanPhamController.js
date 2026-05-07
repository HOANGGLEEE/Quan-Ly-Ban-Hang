const { ok, fail, rows, execute, parseBody, first } = require("../utils/sqlHelpers");
const { createCrudController } = require("./crudFactory");
const { mapSanPham } = require("./retailMappers");

const selectProducts = `
  SELECT sp.MASP, sp.TENSP, sp.MAVACH, sp.MOTA, sp.MADANHMUC, dm.TENDANHMUC,
         sp.DONGIA, sp.THUOCTINH, sp.THUEVAT, sp.SOLUONGTON,
         sp.HINHANH, sp.THUONGHIEU, sp.THOIGIANBAOHANH
  FROM SANPHAM sp
  LEFT JOIN DANHMUC dm ON dm.MADANHMUC = sp.MADANHMUC
`;

const base = createCrudController({
  table: "SANPHAM",
  idColumn: "MASP",
  idParam: "maSP",
  columns: ["MASP", "TENSP", "MAVACH", "MOTA", "MADANHMUC", "DONGIA", "THUOCTINH", "THUEVAT", "SOLUONGTON", "HINHANH", "THUONGHIEU", "THOIGIANBAOHANH"],
  select: selectProducts,
  mapper: mapSanPham,
  labels: { table: "sản phẩm" },
  aliases: {
    MASP: "id",
    TENSP: "name",
    MAVACH: "barcode",
    MOTA: "description",
    MADANHMUC: "categoryId",
    DONGIA: "price",
    THUOCTINH: "attributes",
    THUEVAT: "vat",
    SOLUONGTON: "stock",
    HINHANH: "image",
    THUONGHIEU: "brand",
    THOIGIANBAOHANH: "warrantyMonths",
  },
});

const updateSoLuong = async (req, res) => {
  try {
    const body = parseBody(req, { MASP: "maSP", SOLUONGTON: "soLuongMoi" });
    const maSP = body.MASP || req.query.maSP || req.query.id;
    const soLuongMoi = body.SOLUONGTON ?? req.query.soLuongMoi ?? req.body.soLuongMoi;
    if (!maSP || soLuongMoi === undefined) return fail(res, 400, "Thiếu maSP hoặc soLuongMoi");
    if (Number(soLuongMoi) < 0) return fail(res, 400, "Số lượng tồn không được âm");

    const affected = await execute("UPDATE SANPHAM SET SOLUONGTON = @soLuongMoi WHERE MASP = @maSP", {
      maSP,
      soLuongMoi: Number(soLuongMoi),
    });
    ok(res, { affected }, "Cập nhật số lượng thành công");
  } catch (err) {
    fail(res, 500, "Lỗi cập nhật số lượng", err.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.query.maSP || req.query.id || req.params.id;
    if (!id) return fail(res, 400, "Thiếu maSP");

    const checks = [
      first("SELECT TOP 1 MASP FROM CT_HDB WHERE MASP = @id", { id }),
      first("SELECT TOP 1 MASP FROM CHITIETNHAP WHERE MASP = @id", { id }),
      first("SELECT TOP 1 MASP FROM KHUYENMAI WHERE MASP = @id", { id }),
    ];
    const [invoiceDetail, receiptDetail, promotion] = await Promise.all(checks);
    if (invoiceDetail || receiptDetail || promotion) {
      return fail(res, 400, "Không thể xóa sản phẩm đã phát sinh hóa đơn, phiếu nhập hoặc khuyến mãi");
    }

    const hasOrderTable = await first("SELECT OBJECT_ID('dbo.CHITIETDONHANG', 'U') AS objectId");
    if (hasOrderTable?.objectId) {
      const orderDetail = await first("SELECT TOP 1 MASP FROM CHITIETDONHANG WHERE MASP = @id", { id });
      if (orderDetail) return fail(res, 400, "Không thể xóa sản phẩm đã phát sinh đơn hàng online");
    }

    const affected = await execute("DELETE FROM SANPHAM WHERE MASP = @id", { id });
    ok(res, { affected }, "Xóa sản phẩm thành công");
  } catch (err) {
    fail(res, 500, "Lỗi xóa sản phẩm", err.message);
  }
};

const getLowStock = async (_req, res) => {
  try {
    const data = await rows(`${selectProducts} WHERE ISNULL(sp.SOLUONGTON, 0) <= 5`);
    ok(res, data.map(mapSanPham), "Lấy tồn kho thấp thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy tồn kho thấp", err.message);
  }
};

module.exports = { ...base, updateSoLuong, getLowStock, remove };
