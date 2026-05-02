const db = require("./db");
const { firstValue, trimRows } = require("./http");

async function exists(sqlText, params) {
  const rows = await db.query(sqlText, params);
  return Number(firstValue(rows[0]) || 0) > 0;
}

const danhMuc = {
  all: () => db.query("SELECT MADANHMUC, TENDANHMUC, MOTA FROM DANHMUC"),
  byId: (ma) => db.query("SELECT MADANHMUC, TENDANHMUC, MOTA FROM DANHMUC WHERE MADANHMUC = @ma", { ma }),
  exists: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM DANHMUC WHERE MADANHMUC = @ma", { ma }),
  hasProducts: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM SANPHAM WHERE MADANHMUC = @ma", { ma }),
  create: (x) => db.execute(
    "INSERT INTO DANHMUC (MADANHMUC, TENDANHMUC, MOTA) VALUES (@MADANHMUC, @TENDANHMUC, @MOTA)",
    x
  ),
  update: (x) => db.execute(
    "UPDATE DANHMUC SET TENDANHMUC = @TENDANHMUC, MOTA = @MOTA WHERE MADANHMUC = @MADANHMUC",
    x
  ),
  delete: (ma) => db.execute("DELETE FROM DANHMUC WHERE MADANHMUC = @ma", { ma })
};

const sanPham = {
  all: () => db.query("SELECT MASP, TENSP, MAVACH, MOTA, MADANHMUC, DONGIA, THUOCTINH, THUEVAT, SOLUONGTON FROM SANPHAM"),
  byId: (ma) => db.query("SELECT MASP, TENSP, MAVACH, MOTA, MADANHMUC, DONGIA, THUOCTINH, THUEVAT, SOLUONGTON FROM SANPHAM WHERE MASP = @ma", { ma }),
  exists: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM SANPHAM WHERE MASP = @ma", { ma }),
  create: (x) => db.execute(
    "INSERT INTO SANPHAM (MASP, TENSP, MAVACH, MOTA, MADANHMUC, DONGIA, THUOCTINH, THUEVAT, SOLUONGTON) VALUES (@MASP, @TENSP, @MAVACH, @MOTA, @MADANHMUC, @DONGIA, @THUOCTINH, @THUEVAT, @SOLUONGTON)",
    normalizeSanPham(x)
  ),
  update: (x) => db.execute(
    "UPDATE SANPHAM SET TENSP=@TENSP, MAVACH=@MAVACH, MOTA=@MOTA, MADANHMUC=@MADANHMUC, DONGIA=@DONGIA, THUOCTINH=@THUOCTINH, THUEVAT=@THUEVAT, SOLUONGTON=@SOLUONGTON WHERE MASP=@MASP",
    normalizeSanPham(x)
  ),
  updateQuantity: (ma, soLuong) => db.execute("UPDATE SANPHAM SET SOLUONGTON = @soLuong WHERE MASP = @ma", { ma, soLuong }),
  delete: (ma) => db.execute("DELETE FROM SANPHAM WHERE MASP = @ma", { ma })
};

function normalizeSanPham(x) {
  return {
    ...x,
    THUEVAT: x.THUEVAT ?? x.THUE ?? null
  };
}

const taiKhoan = {
  all: () => db.query("SELECT MATAIKHOAN, USERNAME, PASS, QUYEN FROM TAIKHOAN"),
  byId: (ma) => db.query("SELECT MATAIKHOAN, USERNAME, PASS, QUYEN FROM TAIKHOAN WHERE MATAIKHOAN = @ma", { ma }),
  exists: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM TAIKHOAN WHERE MATAIKHOAN = @ma", { ma }),
  login: (username, pass) => db.query("SELECT TOP 1 MATAIKHOAN, USERNAME, PASS, QUYEN FROM TAIKHOAN WHERE USERNAME = @username AND PASS = @pass", { username, pass }),
  role: async (username) => {
    const rows = await db.query("SELECT TOP 1 QUYEN FROM TAIKHOAN WHERE USERNAME = @username", { username });
    return Number(rows[0]?.QUYEN || 0);
  },
  create: (x) => db.execute("INSERT INTO TAIKHOAN (MATAIKHOAN, USERNAME, PASS, QUYEN) VALUES (@MATAIKHOAN, @USERNAME, @PASS, @QUYEN)", x),
  update: (x) => db.execute("UPDATE TAIKHOAN SET USERNAME=@USERNAME, PASS=@PASS, QUYEN=@QUYEN WHERE MATAIKHOAN=@MATAIKHOAN", x),
  delete: (ma) => db.execute("DELETE FROM TAIKHOAN WHERE MATAIKHOAN = @ma", { ma })
};

const nhanVien = {
  all: () => db.query("SELECT MANV, TENNV, SDT, DIACHI FROM NHANVIEN"),
  byId: (ma) => db.query("SELECT MANV, TENNV, SDT, DIACHI FROM NHANVIEN WHERE MANV = @ma", { ma }),
  exists: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM NHANVIEN WHERE MANV = @ma", { ma }),
  create: (x) => db.execute("INSERT INTO NHANVIEN (MANV, TENNV, SDT, DIACHI) VALUES (@MANV, @TENNV, @SDT, @DIACHI)", x),
  update: (x) => db.execute("UPDATE NHANVIEN SET TENNV=@TENNV, SDT=@SDT, DIACHI=@DIACHI WHERE MANV=@MANV", x),
  delete: (ma) => db.execute("DELETE FROM NHANVIEN WHERE MANV = @ma", { ma })
};

const chiTietNhap = {
  all: () => db.query("SELECT MAPHIEUNHAP, MASP, SOLUONG, DONGIANHAP, THANHTIEN FROM CHITIETNHAP"),
  byPhieu: (ma) => db.query("SELECT MAPHIEUNHAP, MASP, SOLUONG, DONGIANHAP, THANHTIEN FROM CHITIETNHAP WHERE MAPHIEUNHAP = @ma", { ma }),
  byId: (maphieunhap, masp) => db.query("SELECT MAPHIEUNHAP, MASP, SOLUONG, DONGIANHAP, THANHTIEN FROM CHITIETNHAP WHERE MAPHIEUNHAP = @maphieunhap AND MASP = @masp", { maphieunhap, masp }),
  exists: (maphieunhap, masp) => exists("SELECT COUNT(*) AS SoLuong FROM CHITIETNHAP WHERE MAPHIEUNHAP = @maphieunhap AND MASP = @masp", { maphieunhap, masp }),
  create: (x) => db.execute("INSERT INTO CHITIETNHAP (MAPHIEUNHAP, MASP, SOLUONG, DONGIANHAP, THANHTIEN) VALUES (@MAPHIEUNHAP, @MASP, @SOLUONG, @DONGIANHAP, @THANHTIEN)", withNhapTotal(x)),
  update: (x) => db.execute("UPDATE CHITIETNHAP SET SOLUONG=@SOLUONG, DONGIANHAP=@DONGIANHAP, THANHTIEN=@THANHTIEN WHERE MAPHIEUNHAP=@MAPHIEUNHAP AND MASP=@MASP", withNhapTotal(x)),
  delete: (maphieunhap, masp) => db.execute("DELETE FROM CHITIETNHAP WHERE MAPHIEUNHAP = @maphieunhap AND MASP = @masp", { maphieunhap, masp })
};

function withNhapTotal(x) {
  return { ...x, THANHTIEN: x.THANHTIEN ?? Number(x.SOLUONG || 0) * Number(x.DONGIANHAP || 0) };
}

const phieuNhapKho = {
  all: () => db.query("SELECT MAPHIEUNHAP, MANCC, MANV, NGAYLAP FROM PHIEUNHAPKHO"),
  byId: (ma) => db.query("SELECT MAPHIEUNHAP, MANCC, MANV, NGAYLAP FROM PHIEUNHAPKHO WHERE MAPHIEUNHAP = @ma", { ma }),
  exists: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM PHIEUNHAPKHO WHERE MAPHIEUNHAP = @ma", { ma }),
  async create(x) {
    const rows = await db.execute("INSERT INTO PHIEUNHAPKHO (MAPHIEUNHAP, MANCC, MANV, NGAYLAP) VALUES (@MAPHIEUNHAP, @MANCC, @MANV, @NGAYLAP)", x);
    for (const ct of x.listjson_chitietnhap || []) await chiTietNhap.create({ ...ct, MAPHIEUNHAP: x.MAPHIEUNHAP });
    return rows;
  },
  async update(x) {
    await db.execute("DELETE FROM CHITIETNHAP WHERE MAPHIEUNHAP = @MAPHIEUNHAP", x);
    const rows = await db.execute("UPDATE PHIEUNHAPKHO SET MANCC=@MANCC, MANV=@MANV, NGAYLAP=@NGAYLAP WHERE MAPHIEUNHAP=@MAPHIEUNHAP", x);
    for (const ct of x.listjson_chitietnhap || []) await chiTietNhap.create({ ...ct, MAPHIEUNHAP: x.MAPHIEUNHAP });
    return rows;
  },
  async delete(ma) {
    await db.execute("DELETE FROM CHITIETNHAP WHERE MAPHIEUNHAP = @ma", { ma });
    return db.execute("DELETE FROM PHIEUNHAPKHO WHERE MAPHIEUNHAP = @ma", { ma });
  }
};

const chiTietBan = {
  all: () => db.query("SELECT ct.MAHDBAN, ct.MASP, sp.TENSP AS TenSP, ct.SOLUONG, ct.DONGIA, ct.TONGTIEN FROM CT_HDB ct LEFT JOIN SANPHAM sp ON sp.MASP = ct.MASP"),
  byHoaDon: (ma) => db.query("SELECT ct.MAHDBAN, ct.MASP, sp.TENSP AS TenSP, ct.SOLUONG, ct.DONGIA, ct.TONGTIEN FROM CT_HDB ct LEFT JOIN SANPHAM sp ON sp.MASP = ct.MASP WHERE ct.MAHDBAN = @ma", { ma }),
  exists: (mahdban, masp) => exists("SELECT COUNT(*) AS SoLuong FROM CT_HDB WHERE MAHDBAN = @mahdban AND MASP = @masp", { mahdban, masp }),
  create: (x) => db.execute("INSERT INTO CT_HDB (MAHDBAN, MASP, SOLUONG, DONGIA, TONGTIEN) VALUES (@MAHDBAN, @MASP, @SOLUONG, @DONGIA, @TONGTIEN)", withBanTotal(x)),
  update: (x) => db.execute("UPDATE CT_HDB SET SOLUONG=@SOLUONG, DONGIA=@DONGIA, TONGTIEN=@TONGTIEN WHERE MAHDBAN=@MAHDBAN AND MASP=@MASP", withBanTotal(x)),
  delete: (mahdban, masp) => db.execute("DELETE FROM CT_HDB WHERE MAHDBAN = @mahdban AND MASP = @masp", { mahdban, masp })
};

function withBanTotal(x) {
  return { ...x, TONGTIEN: x.TONGTIEN ?? Number(x.SOLUONG || 0) * Number(x.DONGIA || 0) };
}

const hoaDonBan = {
  all: () => db.query("SELECT * FROM HOADONBAN"),
  byId: (ma) => db.query("SELECT * FROM HOADONBAN WHERE MAHDBAN = @ma", { ma }),
  exists: (ma) => exists("SELECT COUNT(*) AS SoLuong FROM HOADONBAN WHERE MAHDBAN = @ma", { ma }),
  async create(x) {
    const rows = await db.execute("INSERT INTO HOADONBAN (MAHDBAN, MANV, MAKH, NGAYLAP, TONGTIENHANG, THUEVAT, GIAMGIA) VALUES (@MAHDBAN, @MANV, @MAKH, @NGAYLAP, @TONGTIENHANG, @THUEVAT, @GIAMGIA)", x);
    for (const ct of x.listjson_chitietban || []) await chiTietBan.create({ ...ct, MAHDBAN: x.MAHDBAN });
    return rows;
  },
  async update(x) {
    await db.execute("DELETE FROM CT_HDB WHERE MAHDBAN = @MAHDBAN", x);
    const rows = await db.execute("UPDATE HOADONBAN SET MANV=@MANV, MAKH=@MAKH, NGAYLAP=@NGAYLAP, TONGTIENHANG=@TONGTIENHANG, THUEVAT=@THUEVAT, GIAMGIA=@GIAMGIA WHERE MAHDBAN=@MAHDBAN", x);
    for (const ct of x.listjson_chitietban || []) await chiTietBan.create({ ...ct, MAHDBAN: x.MAHDBAN });
    return rows;
  },
  async delete(ma) {
    await db.execute("DELETE FROM CT_HDB WHERE MAHDBAN = @ma", { ma });
    return db.execute("DELETE FROM HOADONBAN WHERE MAHDBAN = @ma", { ma });
  },
  resetTongTien: (ma, tongTienMoi) => db.execute("UPDATE HOADONBAN SET TONGTIENHANG = @tongTienMoi WHERE MAHDBAN = @ma", { ma, tongTienMoi })
};

const khachHang = {
  all: () => db.proc("sp_GetKhachHang"),
  byId: (ma) => db.proc("sp_GetByIDKhachHang", { MAKH: ma }),
  create: (x) => db.proc("SP_THEMKH", { MAKH: x.MaKH, TENKH: x.TenKH, SDT: x.SDT, DIACHI: x.DiaChi }),
  update: (x) => db.proc("SP_SUAKH", { MAKH: x.MaKH, TENKH: x.TenKH, SDT: x.SDT, DIACHI: x.DiaChi }),
  delete: (ma) => db.proc("SP_XOAKH", { MAKH: ma })
};

const nhaCungCap = {
  all: () => db.proc("sp_GetNhaCungCap"),
  byId: (ma) => db.proc("sp_GetByIDNhaCungCap", { MANCC: ma }),
  create: (x) => db.proc("SP_THEMNCC", { MANCC: x.MaNCC, TENNCC: x.TenNCC, DIACHI: x.DiaChi, SDT: x.SDT, EMAIL: x.EMAIL }),
  update: (x) => db.proc("SP_SUANCC", { MANCC: x.MaNCC, TENNCC: x.TenNCC, DIACHI: x.DiaChi, SDT: x.SDT, EMAIL: x.EMAIL }),
  delete: (ma) => db.proc("SP_XOANCC", { MANCC: ma })
};

const khuyenMai = {
  all: () => db.proc("sp_GetKhuyenMai"),
  byId: (ma) => db.proc("sp_GetByIDKM", { MAKM: ma }),
  create: (x) => db.proc("SP_THEMKM", { MAKM: x.MaKM, TENKM: x.TenKM, MASP: x.MaSP, NGAYBATDAU: x.NgayBD, NGAYKETTHUC: x.NgayKT }),
  update: (x) => db.proc("SP_SUAKM", { MAKM: x.MaKM, TENKM: x.TenKM, MASP: x.MaSP, NGAYBATDAU: x.NgayBD, NGAYKETTHUC: x.NgayKT }),
  delete: (ma) => db.proc("SP_XOAKM", { MAKM: ma })
};

const thanhToan = {
  all: () => db.proc("sp_GetThanhToan"),
  byId: (ma) => db.proc("sp_GetByIDTT", { MAThanhToan: ma }),
  byHoaDon: (ma) => db.proc("SP_GET_THANHTOAN_BY_MAHDBAN", { MAHDBAN: ma }),
  create: (x) => db.proc("SP_THEMTT", { MaThanhToan: x.MaThanhToan, MaHDBan: x.MaHDBan, PhuongThuc: x.PhuongThuc, SoTienThanhToan: x.SoTienThanhToan, NgayThanhToan: x.NgayThanhToan, TrangThai: x.TrangThai }),
  update: (x) => db.proc("SP_SUATT", { MaThanhToan: x.MaThanhToan, PhuongThuc: x.PhuongThuc, TrangThai: x.TrangThai }),
  delete: (ma) => db.proc("SP_XOAtt", { MAThanhToan: ma }),
  unpaid: () => db.proc("SP_LAY_HOADON_CHUA_THANHTOAN"),
  unpaidByName: (tenKh) => db.proc("SP_LAY_HOADON_CHUA_THANHTOAN_THEO_TENKH", { TenKhachHang: tenKh }),
  markPaid: (maHDBan, phuongThuc) => db.proc("SP_CAPNHAT_TRANGTHAI_THANHTOANTHANHCONG", { MAHDBAN: maHDBan, PHUONGTHUC: phuongThuc }),
  async resetSoTien(maHDBan, soTienMoi = 0) {
    await db.proc("SP_RESET_SOTIENTHANHTOAN_BY_MAHDBAN", { MAHDBAN: maHDBan, SoTienMoi: soTienMoi });
    return thanhToan.byHoaDon(maHDBan);
  }
};

module.exports = {
  trimRows,
  chiTietBan,
  chiTietNhap,
  danhMuc,
  hoaDonBan,
  khachHang,
  khuyenMai,
  nhaCungCap,
  nhanVien,
  phieuNhapKho,
  sanPham,
  taiKhoan,
  thanhToan
};
