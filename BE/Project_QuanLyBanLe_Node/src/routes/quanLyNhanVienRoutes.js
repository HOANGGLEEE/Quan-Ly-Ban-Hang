const express = require("express");
const c = require("../controllers/quanLyNhanVienController");

const router = express.Router();
router.get("/get-all-nhanvien", c.getAll);
router.get("/get-byid-nhanvien", c.getById);
router.post("/create-nhanvien", c.create);
router.post("/update-nhanvien", c.update);
router.put("/update-nhanvien", c.update);
router.delete("/delete-nhanvien", c.remove);

module.exports = router;
