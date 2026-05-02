const express = require("express");
const banHang = require("../controllers/quanLyBanHangController");
const { nhaCungCap } = require("../controllers/quanLyNhapKhoController");

const router = express.Router();
router.get("/get-all-hoadonban", banHang.getAllHoaDon);
router.get("/get-hoadonban-by-id", banHang.getHoaDonById);
router.get("/get-all-thanhtoan", banHang.getAllThanhToan);
router.get("/get-all-nhacungcap", nhaCungCap.getAll);
router.get("/get-byid-nhacungcap", nhaCungCap.getById);
router.get("/get-all-khachhang", banHang.getAllKhachHang);
router.get("/get-byid-khachhang", banHang.getKhachHangById);

module.exports = router;
