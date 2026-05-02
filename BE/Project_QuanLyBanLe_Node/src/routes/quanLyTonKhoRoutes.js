const express = require("express");
const c = require("../controllers/quanLySanPhamController");

const router = express.Router();
router.get("/get-all-sanpham", c.getAll);
router.get("/get-sanpham-by-id", c.getById);
router.post("/update-soluong-sanpham", c.updateSoLuong);
router.patch("/update-soluong-sanpham", c.updateSoLuong);

module.exports = router;
