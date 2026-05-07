const express = require("express");
const banHang = require("../controllers/quanLyBanHangController");
const doiTra = require("../controllers/quanLyDoiTraController");

const router = express.Router();
router.get("/get-all-hoadonban", banHang.getAllHoaDon);
router.get("/get-hoadonban-by-id", banHang.getHoaDonById);
router.get("/get-all-chitietban", banHang.getAllChiTietBan);
router.get("/get-chitietban-by-IDhoadon", banHang.getChiTietBanByHoaDon);
router.get("/get-all-thanhtoan", banHang.getAllThanhToan);
router.post("/insert-thanhtoan", banHang.insertThanhToan);
router.get("/get-all-doitra", doiTra.getAllDoiTra);
router.post("/create-doitra", doiTra.createDoiTra);

module.exports = router;
