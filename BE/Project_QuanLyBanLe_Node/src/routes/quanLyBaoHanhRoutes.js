const express = require("express");
const c = require("../controllers/quanLyBaoHanhController");

const router = express.Router();

router.get("/get-all-baohanh", c.getAllBaoHanh);
router.post("/create-baohanh", c.createBaoHanh);
router.post("/update-status-baohanh", c.updateBaoHanhStatus);

module.exports = router;
