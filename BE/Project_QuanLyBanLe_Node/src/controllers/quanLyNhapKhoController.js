const { createCrudController } = require("./crudFactory");
const { mapChiTietNhap, mapNhaCungCap, mapPhieuNhap } = require("./retailMappers");
const { ok, fail, sql, parseBody, first } = require("../utils/sqlHelpers");

const phieuNhapBase = createCrudController({
  table: "PHIEUNHAPKHO",
  idColumn: "MAPHIEUNHAP",
  idParam: "maPhieuNhap",
  columns: ["MAPHIEUNHAP", "MASP", "MANCC", "MANV", "NGAYLAP", "THUEVAT"],
  mapper: mapPhieuNhap,
  labels: { table: "phiếu nhập kho" },
  aliases: {
    MAPHIEUNHAP: "id",
    MASP: "productId",
    MANCC: "supplierId",
    MANV: "employeeId",
    NGAYLAP: "date",
    THUEVAT: "vat",
  },
});

const createPhieuNhap = async (req, res) => {
  try {
    const body = parseBody(req, {
      MAPHIEUNHAP: "id",
      MASP: "productId",
      MANCC: "supplierId",
      MANV: "employeeId",
      NGAYLAP: "date",
      THUEVAT: "vat",
    });
    if (!body.MAPHIEUNHAP) return fail(res, 400, "Thiếu MAPHIEUNHAP");
    if (!body.MASP) return fail(res, 400, "Thiếu MASP");
    if (!body.MANCC) return fail(res, 400, "Thiếu MANCC");

    const [product, supplier] = await Promise.all([
      first("SELECT TOP 1 MASP FROM SANPHAM WHERE MASP = @maSP", { maSP: body.MASP }),
      first("SELECT TOP 1 MANCC FROM NHACUNGCAP WHERE MANCC = @maNCC", { maNCC: body.MANCC }),
    ]);
    if (!product) return fail(res, 400, "Sản phẩm nhập kho không tồn tại");
    if (!supplier) return fail(res, 400, "Nhà cung cấp không tồn tại");

    return phieuNhapBase.create(req, res);
  } catch (err) {
    fail(res, 500, "Lỗi thêm phiếu nhập kho", err.message);
  }
};

const phieuNhap = { ...phieuNhapBase, create: createPhieuNhap };

const chiTietNhapAliases = {
  MAPHIEUNHAP: "receiptId",
  MASP: "productId",
  SOLUONG: "quantity",
  DONGIANHAP: "price",
  THANHTIEN: "total",
  NGAYNHAPKHO: "importDate",
};

const chiTietNhapBase = createCrudController({
  table: "CHITIETNHAP",
  idColumn: "MAPHIEUNHAP",
  idParam: "maPhieuNhap",
  columns: ["MAPHIEUNHAP", "MASP", "SOLUONG", "DONGIANHAP", "THANHTIEN", "NGAYNHAPKHO"],
  mapper: mapChiTietNhap,
  labels: { table: "chi tiết nhập" },
  aliases: chiTietNhapAliases,
});

const createChiTietNhap = async (req, res) => {
  const tx = new sql.Transaction();
  try {
    const body = parseBody(req, chiTietNhapAliases);
    const maPhieuNhap = body.MAPHIEUNHAP;
    const maSP = body.MASP;
    const soLuong = Number(body.SOLUONG || 0);
    const donGiaNhap = Number(body.DONGIANHAP || 0);
    const thanhTien = body.THANHTIEN ?? soLuong * donGiaNhap;
    const ngayNhapKho = body.NGAYNHAPKHO || new Date();

    if (!maPhieuNhap) return fail(res, 400, "Thiếu MAPHIEUNHAP");
    if (!maSP) return fail(res, 400, "Thiếu MASP");
    if (soLuong <= 0) return fail(res, 400, "Số lượng nhập phải lớn hơn 0");

    const [receipt, product] = await Promise.all([
      first("SELECT TOP 1 MAPHIEUNHAP FROM PHIEUNHAPKHO WHERE MAPHIEUNHAP = @maPhieuNhap", { maPhieuNhap }),
      first("SELECT TOP 1 MASP FROM SANPHAM WHERE MASP = @maSP", { maSP }),
    ]);
    if (!receipt) return fail(res, 400, "Phiếu nhập không tồn tại");
    if (!product) return fail(res, 400, "Sản phẩm nhập kho không tồn tại");

    await tx.begin();
    await new sql.Request(tx)
      .input("maPhieuNhap", maPhieuNhap)
      .input("maSP", maSP)
      .input("soLuong", soLuong)
      .input("donGiaNhap", donGiaNhap)
      .input("thanhTien", thanhTien)
      .input("ngayNhapKho", ngayNhapKho)
      .query(`
        INSERT INTO CHITIETNHAP (MAPHIEUNHAP, MASP, SOLUONG, DONGIANHAP, THANHTIEN, NGAYNHAPKHO)
        VALUES (@maPhieuNhap, @maSP, @soLuong, @donGiaNhap, @thanhTien, @ngayNhapKho)
      `);

    await new sql.Request(tx)
      .input("maSP", maSP)
      .input("soLuong", soLuong)
      .query("UPDATE SANPHAM SET SOLUONGTON = ISNULL(SOLUONGTON, 0) + @soLuong WHERE MASP = @maSP");

    await tx.commit();
    ok(res, { affected: 1 }, "Thêm chi tiết nhập thành công");
  } catch (err) {
    try { await tx.rollback(); } catch (_rollbackErr) {}
    fail(res, 500, "Lỗi thêm chi tiết nhập", err.message);
  }
};

const chiTietNhap = { ...chiTietNhapBase, create: createChiTietNhap };

const nhaCungCap = createCrudController({
  table: "NHACUNGCAP",
  idColumn: "MANCC",
  idParam: "maNCC",
  columns: ["MANCC", "TENNCC", "DIACHI", "SDT", "EMAIL"],
  mapper: mapNhaCungCap,
  labels: { table: "nhà cung cấp" },
  aliases: { MANCC: "id", TENNCC: "name", DIACHI: "address", SDT: "phone", EMAIL: "email" },
});

module.exports = { phieuNhap, chiTietNhap, nhaCungCap };
