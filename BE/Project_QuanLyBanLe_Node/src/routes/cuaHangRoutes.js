const express = require("express");
const c = require("../controllers/cuaHangController");

const router = express.Router();

router.get("/products", c.getProducts);
router.post("/orders", c.createOrder);
router.get("/orders", c.getOrders);
router.post("/orders/status", c.updateOrderStatus);

module.exports = router;
