const express = require("express");
const { phieuNhap, chiTietNhap, nhaCungCap } = require("../controllers/quanLyNhapKhoController");

const router = express.Router();
router.get("/get-all-phieunhapkho", phieuNhap.getAll);
router.get("/get-byid-phieunhapkho", phieuNhap.getById);
router.post("/create-phieunhapkho", phieuNhap.create);
router.post("/update-phieunhapkho", phieuNhap.update);
router.delete("/delete-phieunhapkho", phieuNhap.remove);
router.get("/get-all-chitietnhap", chiTietNhap.getAll);
router.get("/get-byphieu-chitietnhap", chiTietNhap.getById);
router.get("/get-byid-chitietnhap", chiTietNhap.getById);
router.post("/create-chitietnhap", chiTietNhap.create);
router.post("/update-chitietnhap", chiTietNhap.update);
router.delete("/delete-chitietnhap", chiTietNhap.remove);
router.get("/get-all-nhacungcap", nhaCungCap.getAll);
router.get("/get-byid-nhacungcap", nhaCungCap.getById);
router.delete("/del-nhacungcap", nhaCungCap.remove);
router.post("/update-nhacungcap", nhaCungCap.update);
router.post("/create-nhacungcap", nhaCungCap.create);

module.exports = router;
