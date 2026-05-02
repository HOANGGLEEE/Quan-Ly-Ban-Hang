const express = require("express");
const router = express.Router();

const { login, getRole } = require("../controllers/authController");

router.post("/login", login);
router.get("/get-role", getRole);

module.exports = router;
