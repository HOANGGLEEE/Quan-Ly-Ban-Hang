const express = require("express");
const c = require("../controllers/quanLyBanHangController");

const router = express.Router();
router.patch("/update-soluong-sanpham", require("../controllers/quanLySanPhamController").updateSoLuong);
router.post("/insert-thanhtoan", c.insertThanhToan);
router.post("/insert-khachhang", c.insertKhachHang);
router.post("/insert-hoadonban", c.insertHoaDon);
router.get("/get-all-hoadonban", c.getAllHoaDon);
router.get("/get-hoadonban-by-id", c.getHoaDonById);
router.get("/get-all-chitietban", c.getAllChiTietBan);
router.get("/get-chitietban-by-IDhoadon", c.getChiTietBanByHoaDon);
router.get("/get-all-khachhang", c.getAllKhachHang);
router.get("/get-byid-khachhang", c.getKhachHangById);
router.get("/get-all-danhmuc", c.getAllDanhMuc);
router.get("/get-all-sanpham", c.getAllSanPham);

module.exports = router;
