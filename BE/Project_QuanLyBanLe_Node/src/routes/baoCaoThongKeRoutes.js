const express = require("express");
const c = require("../controllers/baoCaoThongKeController");

const router = express.Router();
router.get("/get-all-danhmuc", c.getAllDanhMuc);
router.get("/get-all-sanpham", c.getAllSanPham);
router.get("/get-all-khuyenmai", c.getAllKhuyenMai);
router.get("/get-all-phieunhapkho", c.getAllPhieuNhapKho);
router.get("/get-all-chitietnhap", c.getAllChiTietNhap);
router.get("/get-all-hoadonban", c.getAllHoaDon);
router.get("/get-all-chitietban", c.getAllChiTietBan);

module.exports = router;
