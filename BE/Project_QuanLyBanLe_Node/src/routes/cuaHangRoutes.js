const express = require("express");
const c = require("../controllers/cuaHangController");

const router = express.Router();

router.get("/products", c.getProducts);
router.post("/orders", c.createOrder);
router.get("/orders", c.getOrders);
router.post("/orders/status", c.updateOrderStatus);
router.post("/orders/shipping", c.updateShipping);
router.post("/orders/cancel", c.cancelOrder);

module.exports = router;
