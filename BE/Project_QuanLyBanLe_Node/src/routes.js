const express = require("express");
const { authenticate, signAccount } = require("./auth");
const repo = require("./repositories");
const { asyncHandler, trimRows } = require("./http");

function has(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function success(message, data) {
  return data === undefined ? { success: true, message } : { success: true, message, data };
}

function failure(message) {
  return { success: false, message };
}

function mapTaiKhoan(rows) {
  return trimRows(rows).map((x) => ({ MaTaiKhoan: x.MATAIKHOAN, UserName: x.USERNAME, Quyen: x.QUYEN }));
}

function mapThanhToan(rows) {
  return trimRows(rows).map((x) => ({
    MATHANHTOAN: x.MATHANHTOAN ?? x.MaThanhToan,
    MAHDBan: x.MAHDBan ?? x.MaHDBan,
    PhuongThuc: x.PhuongThuc,
    SoTienThanhToan: x.SoTienThanhToan,
    NGAYTHANHTOAN: x.NGAYTHANHTOAN ?? x.NgayThanhToan,
    TrangThai: x.TrangThai
  }));
}

function createRoutes() {
  const app = express.Router();

  app.use("/api/Login", loginRouter());

  mount(app, ["/api/QuanLyTaiKhoan", "/api-admin/QuanLyTaiKhoan"], taiKhoanRouter());
  mount(app, ["/api/QuanLyNhanVien", "/api-admin/QuanLyNhanVien"], nhanVienRouter());
  mount(app, ["/api/QuanLyKhuyenMai", "/api-admin/QuanLyKhuyenMai", "/api-ketoan/QuanLyKhuyenMai"], khuyenMaiRouter());
  mount(app, ["/api/QuanLyDanhMuc", "/api-thukho/QuanLyDanhMuc"], danhMucRouter());
  mount(app, ["/api/QuanLySanPham", "/api-thukho/QuanLySanPham"], sanPhamRouter());
  mount(app, ["/api/QuanLyTonKho", "/api-thukho/QuanLyTonKho"], tonKhoRouter());
  mount(app, ["/api/QuanLyNhapKho", "/api-thukho/QuanLyNhapKho"], nhapKhoRouter());
  mount(app, ["/api/QuanLyBanHang", "/api-thungan/QuanLyBanHang"], banHangRouter());
  mount(app, ["/api/QuanLyDoiTra", "/api-thungan/QuanLyDoiTra"], doiTraRouter());
  mount(app, ["/api/BaoCaoThongKe", "/api-ketoan/BaoCaoThongKe"], baoCaoRouter());
  mount(app, ["/api/QuanLyCongNo", "/api-ketoan/QuanLyCongNo"], congNoRouter());
  mount(app, ["/api-common/Login"], loginRouter());

  return app;
}

function mount(app, paths, router) {
  paths.forEach((path) => app.use(path, authenticate, router));
}

function loginRouter() {
  const r = express.Router();

  r.post("/login", asyncHandler(async (req, res) => {
    const username = req.query.username ?? req.body.username ?? req.body.USERNAME;
    const pass = req.query.pass ?? req.body.pass ?? req.body.PASS;
    if (!has(username) || !has(pass)) return res.json(failure("Thieu username hoac password!"));

    const rows = await repo.taiKhoan.login(username, pass);
    if (!rows.length) return res.json(failure("Sai ten dang nhap hoac mat khau!"));

    const user = trimRows(rows)[0];
    return res.json(success("Dang nhap thanh cong!", {
      MaTaiKhoan: user.MATAIKHOAN,
      UserName: user.USERNAME,
      Quyen: user.QUYEN
    }) && {
      success: true,
      message: "Dang nhap thanh cong!",
      token: signAccount(user),
      data: { MaTaiKhoan: user.MATAIKHOAN, UserName: user.USERNAME, Quyen: user.QUYEN }
    });
  }));

  r.get("/get-role", asyncHandler(async (req, res) => {
    const { username } = req.query;
    if (!has(username)) return res.json(failure("Thieu ten dang nhap!"));
    const quyen = await repo.taiKhoan.role(username);
    if (!quyen) return res.json(failure("Khong tim thay tai khoan hoac chua duoc cap quyen!"));
    return res.json(success("Lay quyen thanh cong!", { UserName: String(username).trim(), Quyen: quyen }));
  }));

  return r;
}

function taiKhoanRouter() {
  const r = express.Router();
  r.get("/get-all-taikhoan", asyncHandler(async (req, res) => res.json(success("Lay danh sach tai khoan thanh cong", mapTaiKhoan(await repo.taiKhoan.all())))));
  r.get("/get-byid-taikhoan", asyncHandler(async (req, res) => {
    const rows = await repo.taiKhoan.byId(req.query.mataikhoan);
    if (!rows.length) return res.json(failure("Khong tim thay tai khoan"));
    return res.json(success("Lay thong tin tai khoan thanh cong", mapTaiKhoan(rows)));
  }));
  r.post("/create-taikhoan", asyncHandler(async (req, res) => {
    const x = req.body;
    if (!has(x.MATAIKHOAN) || !has(x.USERNAME) || !has(x.PASS)) return res.json(failure("Thieu thong tin bat buoc"));
    if (await repo.taiKhoan.exists(x.MATAIKHOAN)) return res.json(failure("Khong the them (co the ma da ton tai)"));
    await repo.taiKhoan.create(x);
    return res.json(success("Them tai khoan thanh cong"));
  }));
  r.post("/update-byID-taikhoan", asyncHandler(async (req, res) => {
    const x = req.body;
    if (!has(x.MATAIKHOAN) || !has(x.USERNAME) || !has(x.PASS)) return res.json(failure("Thieu thong tin bat buoc"));
    const rows = await repo.taiKhoan.update(x);
    return res.json(rows ? success("Cap nhat tai khoan thanh cong") : failure("Khong the cap nhat"));
  }));
  r.delete("/del-byID-taikhoan", asyncHandler(async (req, res) => {
    const rows = await repo.taiKhoan.delete(req.query.mataikhoan);
    return res.json(rows ? success("Xoa tai khoan thanh cong") : failure("Khong the xoa (khong tim thay ma)"));
  }));
  r.post("/login", asyncHandler(async (req, res) => {
    const rows = await repo.taiKhoan.login(req.body.USERNAME, req.body.PASS);
    if (!rows.length) return res.json(failure("Sai ten dang nhap hoac mat khau"));
    return res.json(success("Dang nhap thanh cong", mapTaiKhoan(rows)));
  }));
  return r;
}

function nhanVienRouter() {
  const r = express.Router();
  r.get("/get-all-nhanvien", asyncHandler(async (req, res) => res.json(success("Lay danh sach nhan vien thanh cong", trimRows(await repo.nhanVien.all())))));
  r.get("/get-byid-nhanvien", asyncHandler(async (req, res) => {
    const rows = await repo.nhanVien.byId(req.query.manv);
    return rows.length ? res.json(success("Lay thong tin nhan vien thanh cong", trimRows(rows))) : res.json(failure("Khong tim thay nhan vien"));
  }));
  r.post("/create-nhanvien", asyncHandler(async (req, res) => {
    if (!has(req.body.MANV) || !has(req.body.TENNV)) return res.json(failure("Thieu thong tin bat buoc"));
    if (await repo.nhanVien.exists(req.body.MANV)) return res.json(failure("Khong the them (ma da ton tai hoac loi du lieu)"));
    await repo.nhanVien.create(req.body);
    return res.json(success("Them nhan vien thanh cong"));
  }));
  r.post("/update-nhanvien", asyncHandler(async (req, res) => {
    if (!has(req.body.MANV)) return res.json(failure("Thieu ma nhan vien"));
    const rows = await repo.nhanVien.update(req.body);
    return res.json(rows ? success("Cap nhat nhan vien thanh cong") : failure("Khong the cap nhat"));
  }));
  r.delete("/delete-nhanvien", asyncHandler(async (req, res) => {
    const rows = await repo.nhanVien.delete(req.query.manv);
    return res.json(rows ? success("Xoa nhan vien thanh cong") : failure("Khong the xoa (ma khong ton tai)"));
  }));
  return r;
}

function khuyenMaiRouter() {
  const r = express.Router();
  r.get("/get-all-khuyenmai", asyncHandler(async (req, res) => res.json(success("Lay danh sach khuyen mai thanh cong", trimRows(await repo.khuyenMai.all())))));
  r.get("/get-byid-khuyenmai", asyncHandler(async (req, res) => res.json(success("Lay thong tin khuyen mai thanh cong", trimRows(await repo.khuyenMai.byId(req.query.ma))))));
  r.post("/create-khuyenmai", asyncHandler(async (req, res) => {
    if ((await repo.khuyenMai.byId(req.body.MaKM)).length) return res.json(failure("Da ton tai khuyen mai co ma nay"));
    await repo.khuyenMai.create(req.body);
    return res.json(success("Them thong tin khuyen mai thanh cong"));
  }));
  r.post("/update-khuyenmai", asyncHandler(async (req, res) => {
    if (!(await repo.khuyenMai.byId(req.body.MaKM)).length) return res.json(failure("Khong co thong tin khuyen mai co ma nay"));
    await repo.khuyenMai.update(req.body);
    return res.json(success("Thay doi thong tin khuyen mai thanh cong"));
  }));
  r.delete("/del-khuyenmai", asyncHandler(async (req, res) => {
    if (!(await repo.khuyenMai.byId(req.query.ma)).length) return res.json(failure("Khong co thong tin khuyen mai co ma nay"));
    await repo.khuyenMai.delete(req.query.ma);
    return res.json(success("Xoa thong tin khuyen mai thanh cong"));
  }));
  return r;
}

function danhMucRouter() {
  const r = express.Router();
  r.get("/get-all-danhmuc", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.danhMuc.all());
    return rows.length ? res.json(rows) : res.status(204).end();
  }));
  r.get("/get-byID-danhmuc", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.danhMuc.byId(req.query.madanhmuc));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay danh muc.");
  }));
  r.post("/insert-danhmuc", asyncHandler(async (req, res) => {
    if (!has(req.body.MADANHMUC) || !has(req.body.TENDANHMUC) || await repo.danhMuc.exists(req.body.MADANHMUC)) return res.status(400).send("Them that bai");
    await repo.danhMuc.create(req.body);
    return res.send("Them thanh cong");
  }));
  r.put("/update-danhmuc", asyncHandler(async (req, res) => {
    const rows = await repo.danhMuc.update(req.body);
    return rows ? res.send("Sua thanh cong") : res.status(400).send("Sua that bai");
  }));
  r.delete("/delete-danhmuc", asyncHandler(async (req, res) => {
    const ma = req.query.maDanhMuc;
    if (!await repo.danhMuc.exists(ma) || await repo.danhMuc.hasProducts(ma)) return res.status(400).send("Xoa that bai");
    await repo.danhMuc.delete(ma);
    return res.send("Xoa thanh cong");
  }));
  return r;
}

function sanPhamRouter() {
  const r = express.Router();
  addSanPhamReadRoutes(r);
  r.post("/insert-sanpham", asyncHandler(async (req, res) => {
    if (!has(req.body.MASP) || !has(req.body.TENSP) || await repo.sanPham.exists(req.body.MASP)) return res.status(400).send("Them that bai");
    await repo.sanPham.create(req.body);
    return res.send("Them thanh cong");
  }));
  r.put("/update-sanpham", asyncHandler(async (req, res) => {
    const rows = await repo.sanPham.update(req.body);
    return rows ? res.send("Cap nhat thanh cong") : res.status(400).send("Cap nhat that bai");
  }));
  r.patch("/update-soluong-sanpham", updateSoLuong);
  r.delete("/delete-sanpham", asyncHandler(async (req, res) => {
    const rows = await repo.sanPham.delete(req.query.maSP);
    return rows ? res.send("Xoa san pham thanh cong") : res.status(400).send("Xoa that bai");
  }));
  return r;
}

function tonKhoRouter() {
  const r = express.Router();
  addSanPhamReadRoutes(r);
  r.post("/update-soluong-sanpham", updateSoLuong);
  return r;
}

function addSanPhamReadRoutes(r) {
  r.get("/get-all-sanpham", asyncHandler(async (req, res) => res.json(trimRows(await repo.sanPham.all()))));
  r.get("/get-sanpham-by-id", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.sanPham.byId(req.query.id));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay san pham.");
  }));
}

const updateSoLuong = asyncHandler(async (req, res) => {
  const ma = req.query.maSP ?? req.body.maSP;
  const soLuong = Number(req.query.soLuongMoi ?? req.body.soLuongMoi);
  const rows = await repo.sanPham.updateQuantity(ma, soLuong);
  return rows ? res.send("Cap nhat so luong thanh cong") : res.status(400).send("Cap nhat that bai");
});

function nhapKhoRouter() {
  const r = express.Router();
  addNhapKhoRoutes(r);
  addNhaCungCapRoutes(r);
  return r;
}

function addNhapKhoRoutes(r) {
  r.get("/get-all-phieunhapkho", asyncHandler(async (req, res) => res.json(success("Lay danh sach phieu nhap kho thanh cong", trimRows(await repo.phieuNhapKho.all())))));
  r.get("/get-byid-phieunhapkho", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.phieuNhapKho.byId(req.query.maphieunhap));
    return rows.length ? res.json(success("Lay thong tin phieu nhap kho thanh cong", rows)) : res.json(failure("Khong tim thay phieu nhap kho"));
  }));
  r.post("/create-phieunhapkho", asyncHandler(async (req, res) => {
    if (!has(req.body.MAPHIEUNHAP) || await repo.phieuNhapKho.exists(req.body.MAPHIEUNHAP)) return res.json(failure("Khong the them (ma da ton tai hoac loi du lieu)"));
    await repo.phieuNhapKho.create(req.body);
    return res.json(success("Them phieu nhap kho thanh cong"));
  }));
  r.post("/update-phieunhapkho", asyncHandler(async (req, res) => {
    const rows = await repo.phieuNhapKho.update(req.body);
    return res.json(rows ? success("Cap nhat phieu nhap kho thanh cong") : failure("Khong the cap nhat"));
  }));
  r.delete("/delete-phieunhapkho", asyncHandler(async (req, res) => {
    const rows = await repo.phieuNhapKho.delete(req.query.maphieunhap);
    return res.json(rows ? success("Xoa phieu nhap kho thanh cong") : failure("Khong the xoa"));
  }));

  r.get("/get-all-chitietnhap", asyncHandler(async (req, res) => res.json(success("Lay danh sach chi tiet nhap thanh cong", trimRows(await repo.chiTietNhap.all())))));
  r.get("/get-byphieu-chitietnhap", asyncHandler(async (req, res) => res.json(success("Lay chi tiet theo phieu thanh cong", trimRows(await repo.chiTietNhap.byPhieu(req.query.maphieunhap))))));
  r.get("/get-byid-chitietnhap", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.chiTietNhap.byId(req.query.maphieunhap, req.query.masp));
    return rows.length ? res.json(success("Lay chi tiet nhap thanh cong", rows[0])) : res.json(failure("Khong tim thay chi tiet nhap"));
  }));
  r.post("/create-chitietnhap", asyncHandler(async (req, res) => {
    if (!has(req.body.MAPHIEUNHAP) || !has(req.body.MASP) || Number(req.body.SOLUONG) <= 0) return res.json(failure("Thieu/khong hop le thong tin bat buoc"));
    if (await repo.chiTietNhap.exists(req.body.MAPHIEUNHAP, req.body.MASP)) return res.json(failure("Khong the them (dong da ton tai hoac du lieu khong hop le)"));
    await repo.chiTietNhap.create(req.body);
    return res.json(success("Them chi tiet nhap thanh cong"));
  }));
  r.post("/update-chitietnhap", asyncHandler(async (req, res) => {
    const rows = await repo.chiTietNhap.update(req.body);
    return res.json(rows ? success("Cap nhat chi tiet nhap thanh cong") : failure("Khong the cap nhat"));
  }));
  r.delete("/delete-chitietnhap", asyncHandler(async (req, res) => {
    const rows = await repo.chiTietNhap.delete(req.query.maphieunhap, req.query.masp);
    return res.json(rows ? success("Xoa chi tiet nhap thanh cong") : failure("Khong the xoa"));
  }));
}

function addNhaCungCapRoutes(r) {
  r.get("/get-all-nhacungcap", asyncHandler(async (req, res) => res.json(success("Lay danh sach nha cung cap thanh cong", trimRows(await repo.nhaCungCap.all())))));
  r.get("/get-byid-nhacungcap", asyncHandler(async (req, res) => res.json(success("Lay thong tin nha cung cap thanh cong", trimRows(await repo.nhaCungCap.byId(req.query.ma))))));
  r.post("/create-nhacungcap", asyncHandler(async (req, res) => {
    if ((await repo.nhaCungCap.byId(req.body.MaNCC)).length) return res.json(failure("Da ton tai nha cung cap co ma nay"));
    await repo.nhaCungCap.create(req.body);
    return res.json(success("Them thong tin nha cung cap thanh cong"));
  }));
  r.post("/update-nhacungcap", asyncHandler(async (req, res) => {
    if (!(await repo.nhaCungCap.byId(req.body.MaNCC)).length) return res.json(failure("Khong co thong tin nha cung cap co ma nay"));
    await repo.nhaCungCap.update(req.body);
    return res.json(success("Thay doi thong tin nha cung cap thanh cong"));
  }));
  r.delete("/del-nhacungcap", asyncHandler(async (req, res) => {
    if (!(await repo.nhaCungCap.byId(req.query.ma)).length) return res.json(failure("Khong co thong tin nha cung cap co ma nay"));
    await repo.nhaCungCap.delete(req.query.ma);
    return res.json(success("Xoa thong tin nha cung cap thanh cong"));
  }));
}

function banHangRouter() {
  const r = express.Router();
  r.patch("/update-soluong-sanpham", updateSoLuong);
  r.post("/insert-thanhtoan", createThanhToan);
  r.post("/insert-khachhang", asyncHandler(async (req, res) => {
    await repo.khachHang.create(req.body);
    return res.json(success("Them khach hang thanh cong!"));
  }));
  addHoaDonReadCreateRoutes(r);
  r.get("/get-all-chitietban", asyncHandler(async (req, res) => res.json(trimRows(await repo.chiTietBan.all()))));
  r.get("/get-chitietban-by-IDhoadon", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.chiTietBan.byHoaDon(req.query.maHDB));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay chi tiet cua hoa don.");
  }));
  r.get("/get-all-khachhang", asyncHandler(async (req, res) => res.json(success("Lay danh sach khach thanh cong", trimRows(await repo.khachHang.all())))));
  r.get("/get-byid-khachhang", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.khachHang.byId(req.query.maKH));
    return rows.length ? res.json(success("Lay thong tin khach hang thanh cong!", rows.length === 1 ? rows[0] : rows)) : res.status(404).json(failure("Khong tim thay khach hang."));
  }));
  addDanhMucReadRoutes(r);
  addSanPhamReadRoutes(r);
  return r;
}

function doiTraRouter() {
  const r = express.Router();
  addHoaDonFullRoutes(r);
  r.get("/get-all-chitietban", asyncHandler(async (req, res) => res.json(trimRows(await repo.chiTietBan.all()))));
  r.get("/get-chitietban-by-IDhoadon", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.chiTietBan.byHoaDon(req.query.maHDB));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay chi tiet cua hoa don.");
  }));
  r.post("/insert-chitietban", asyncHandler(async (req, res) => {
    const ok = !await repo.chiTietBan.exists(req.body.MAHDBAN, req.body.MASP);
    if (!ok) return res.status(400).send("Them that bai");
    await repo.chiTietBan.create(req.body);
    return res.send("Them chi tiet thanh cong");
  }));
  r.put("/update-chitietban", asyncHandler(async (req, res) => {
    const rows = await repo.chiTietBan.update(req.body);
    return rows ? res.send("Cap nhat chi tiet thanh cong") : res.status(400).send("Cap nhat that bai");
  }));
  r.delete("/delete-chitietban", asyncHandler(async (req, res) => {
    const rows = await repo.chiTietBan.delete(req.query.maHDB, req.query.maSP);
    return rows ? res.send("Xoa chi tiet thanh cong") : res.status(400).send("Xoa that bai");
  }));
  addThanhToanRoutes(r);
  r.post("/reset-sotienthanhtoan-by-mahdban", resetSoTien);
  r.post("/reset-tongtienhang-by-mahdban", resetTongTien);
  return r;
}

function addHoaDonReadCreateRoutes(r) {
  r.post("/insert-hoadonban", asyncHandler(async (req, res) => {
    if (!has(req.body.MAHDBAN) || await repo.hoaDonBan.exists(req.body.MAHDBAN)) return res.json(failure("Khong the them hoa don (da ton tai hoac loi khac)."));
    await repo.hoaDonBan.create(req.body);
    return res.json(success("Them hoa don thanh cong!"));
  }));
  r.get("/get-all-hoadonban", asyncHandler(async (req, res) => res.json(trimRows(await repo.hoaDonBan.all()))));
  r.get("/get-hoadonban-by-id", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.hoaDonBan.byId(req.query.maHoaDon));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay hoa don.");
  }));
}

function addHoaDonFullRoutes(r) {
  addHoaDonReadCreateRoutes(r);
  r.put("/update-hoadonban", asyncHandler(async (req, res) => {
    const rows = await repo.hoaDonBan.update(req.body);
    return rows ? res.send("Cap nhat hoa don thanh cong") : res.status(400).send("Cap nhat hoa don that bai");
  }));
  r.delete("/delete-hoadonban", asyncHandler(async (req, res) => {
    const rows = await repo.hoaDonBan.delete(req.query.maHoaDon);
    return rows ? res.send("Xoa hoa don thanh cong") : res.status(400).send("Xoa hoa don that bai");
  }));
}

const createThanhToan = asyncHandler(async (req, res) => {
  if ((await repo.thanhToan.byId(req.body.MaThanhToan)).length) return res.json(failure("Da ton tai thanh toan co ma nay"));
  await repo.thanhToan.create(req.body);
  return res.json(success("Them thong tin thanh toan thanh cong"));
});

function addThanhToanRoutes(r) {
  r.get("/get-all-thanhtoan", asyncHandler(async (req, res) => res.json(success("Lay danh sach thanh toan thanh cong", mapThanhToan(await repo.thanhToan.all())))));
  r.get("/get-byId-thanhtoan", asyncHandler(async (req, res) => res.json(success("Lay thong tin thanh toan thanh cong", mapThanhToan(await repo.thanhToan.byId(req.query.ma))))));
  r.post("/insert-thanhtoan", createThanhToan);
  r.post("/update-thanhtoan", asyncHandler(async (req, res) => {
    if (!(await repo.thanhToan.byId(req.body.MaThanhToan)).length) return res.json(failure("Khong ton tai thanh toan co ma nay"));
    await repo.thanhToan.update(req.body);
    return res.json(success("Thay doi thong tin thanh toan thanh cong"));
  }));
  r.delete("/del-thanhtoan", asyncHandler(async (req, res) => {
    if (!(await repo.thanhToan.byId(req.query.ma)).length) return res.json(failure("Khong co thong tin thanh toan co ma nay"));
    await repo.thanhToan.delete(req.query.ma);
    return res.json(success("Xoa thong tin thanh toan thanh cong"));
  }));
  r.get("/get-thanhtoan-by-mahdban", asyncHandler(async (req, res) => res.json(success("Lay danh sach thanh toan theo hoa don thanh cong", mapThanhToan(await repo.thanhToan.byHoaDon(req.query.maHDBan))))));
}

const resetSoTien = asyncHandler(async (req, res) => {
  const maHDBan = req.query.maHDBan ?? req.body.maHDBan;
  const soTienMoi = Number(req.query.soTienMoi ?? req.body.soTienMoi ?? 0);
  if (!has(maHDBan)) return res.status(400).json(failure("Thieu ma hoa don ban"));
  const rows = await repo.thanhToan.resetSoTien(maHDBan, soTienMoi);
  return res.json(success("Da reset so tien thanh toan theo hoa don.", mapThanhToan(rows)));
});

const resetTongTien = asyncHandler(async (req, res) => {
  const maHDBan = req.query.maHDBan ?? req.body.maHDBan;
  const tongTienMoi = Number(req.query.tongTienMoi ?? req.body.tongTienMoi ?? 0);
  if (!has(maHDBan)) return res.status(400).json(failure("Thieu ma hoa don ban"));
  const rows = await repo.hoaDonBan.resetTongTien(maHDBan, tongTienMoi);
  return res.json({
    success: !!rows,
    message: rows ? "Da cap nhat TONGTIENHANG cho hoa don." : "Khong cap nhat duoc TONGTIENHANG (kiem tra ma hoa don)."
  });
});

function baoCaoRouter() {
  const r = express.Router();
  addDanhMucReadRoutes(r);
  addSanPhamReadRoutes(r);
  r.get("/get-all-khuyenmai", asyncHandler(async (req, res) => res.json(success("Lay danh sach khuyen mai thanh cong", trimRows(await repo.khuyenMai.all())))));
  r.get("/get-byid-khuyenmai", asyncHandler(async (req, res) => res.json(success("Lay thong tin khuyen mai thanh cong", trimRows(await repo.khuyenMai.byId(req.query.ma))))));
  addNhapKhoRoutes(r);
  r.get("/get-all-hoadonban", asyncHandler(async (req, res) => res.json(trimRows(await repo.hoaDonBan.all()))));
  r.get("/get-hoadonban-by-id", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.hoaDonBan.byId(req.query.maHoaDon));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay hoa don.");
  }));
  r.get("/get-all-chitietban", asyncHandler(async (req, res) => res.json(trimRows(await repo.chiTietBan.all()))));
  r.get("/get-chitietban-by-IDhoadon", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.chiTietBan.byHoaDon(req.query.maHDB));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay chi tiet cua hoa don.");
  }));
  return r;
}

function addDanhMucReadRoutes(r) {
  r.get("/get-all-danhmuc", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.danhMuc.all());
    return rows.length ? res.json(rows) : res.status(204).end();
  }));
  r.get("/get-byID-danhmuc", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.danhMuc.byId(req.query.madanhmuc));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay danh muc.");
  }));
}

function congNoRouter() {
  const r = express.Router();
  r.get("/search-khachhang-chuathanhtoan", asyncHandler(async (req, res) => {
    if (!has(req.query.tenKh)) return res.status(400).json(failure("Thieu ten khach hang."));
    return res.json(success("Lay danh sach hoa don chua thanh toan theo ten khach hang thanh cong!", trimRows(await repo.thanhToan.unpaidByName(req.query.tenKh))));
  }));
  r.put("/update-trangthai-thanhtoan", asyncHandler(async (req, res) => {
    if (!has(req.query.maHDBan)) return res.status(400).json(failure("Ma hoa don khong duoc de trong!"));
    if (!has(req.query.phuongThuc)) return res.status(400).json(failure("Phuong thuc thanh toan khong duoc de trong!"));
    await repo.thanhToan.markPaid(req.query.maHDBan, req.query.phuongThuc);
    return res.json(success("Cap nhat trang thai, phuong thuc, so tien va ngay thanh toan thanh cong!"));
  }));
  r.get("/get-hoadon-chuathanhtoan", asyncHandler(async (req, res) => res.json(success("Lay danh sach hoa don chua thanh toan thanh cong!", trimRows(await repo.thanhToan.unpaid())))));
  r.get("/get-all-hoadonban", asyncHandler(async (req, res) => res.json(trimRows(await repo.hoaDonBan.all()))));
  r.get("/get-hoadonban-by-id", asyncHandler(async (req, res) => {
    const rows = trimRows(await repo.hoaDonBan.byId(req.query.maHoaDon));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay hoa don.");
  }));
  addThanhToanRoutes(r);
  addNhaCungCapRoutes(r);
  r.get("/get-all-khachhang", asyncHandler(async (req, res) => res.json(success("Lay danh sach khach thanh cong", trimRows(await repo.khachHang.all())))));
  r.get("/get-byid-khachhang", asyncHandler(async (req, res) => res.json(success("Lay thong tin khach thanh cong", trimRows(await repo.khachHang.byId(req.query.makh))))));
  return r;
}

module.exports = createRoutes;
