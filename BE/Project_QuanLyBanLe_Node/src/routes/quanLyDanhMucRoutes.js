const express = require("express");
const c = require("../controllers/quanLyDanhMucController");

const router = express.Router();
router.get("/get-all-danhmuc", c.getAll);
router.get("/get-byID-danhmuc", c.getById);
router.post("/insert-danhmuc", c.create);
router.put("/update-danhmuc", c.update);
router.delete("/delete-danhmuc", c.remove);

module.exports = router;
