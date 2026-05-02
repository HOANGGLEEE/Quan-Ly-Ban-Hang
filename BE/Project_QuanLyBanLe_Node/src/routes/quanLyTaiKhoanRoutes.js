const express = require("express");
const c = require("../controllers/quanLyTaiKhoanController");

const router = express.Router();
router.get("/get-all-taikhoan", c.getAll);
router.get("/get-byid-taikhoan", c.getById);
router.get("/get-role", c.getRole);
router.post("/create-taikhoan", c.create);
router.post("/update-byID-taikhoan", c.update);
router.put("/update-byID-taikhoan", c.update);
router.delete("/del-byID-taikhoan", c.remove);
router.post("/login", c.login);

module.exports = router;
