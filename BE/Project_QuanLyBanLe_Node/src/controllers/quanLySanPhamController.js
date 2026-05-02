const { ok, fail, rows, execute, parseBody } = require("../utils/sqlHelpers");
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

    const affected = await execute("UPDATE SANPHAM SET SOLUONGTON = @soLuongMoi WHERE MASP = @maSP", {
      maSP,
      soLuongMoi: Number(soLuongMoi),
    });
    ok(res, { affected }, "Cập nhật số lượng thành công");
  } catch (err) {
    fail(res, 500, "Lỗi cập nhật số lượng", err.message);
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

module.exports = { ...base, updateSoLuong, getLowStock };
