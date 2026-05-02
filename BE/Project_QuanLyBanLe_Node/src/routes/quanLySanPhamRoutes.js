const express = require("express");
const c = require("../controllers/quanLySanPhamController");

const router = express.Router();
router.get("/get-all-sanpham", c.getAll);
router.get("/get-sanpham-by-id", c.getById);
router.get("/low-stock", c.getLowStock);
router.post("/insert-sanpham", c.create);
router.put("/update-sanpham", c.update);
router.patch("/update-soluong-sanpham", c.updateSoLuong);
router.post("/update-soluong-sanpham", c.updateSoLuong);
router.delete("/delete-sanpham", c.remove);

module.exports = router;
