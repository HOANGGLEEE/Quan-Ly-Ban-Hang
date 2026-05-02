const express = require("express");
const { login, getRole } = require("../controllers/quanLyTaiKhoanController");

const router = express.Router();
router.post("/login", login);
router.get("/get-role", getRole);

module.exports = router;
