const express = require("express");
const banHang = require("../controllers/quanLyBanHangController");

const router = express.Router();
router.get("/get-all-hoadonban", banHang.getAllHoaDon);
router.get("/get-hoadonban-by-id", banHang.getHoaDonById);
router.get("/get-all-chitietban", banHang.getAllChiTietBan);
router.get("/get-chitietban-by-IDhoadon", banHang.getChiTietBanByHoaDon);
router.get("/get-all-thanhtoan", banHang.getAllThanhToan);
router.post("/insert-thanhtoan", banHang.insertThanhToan);

module.exports = router;
