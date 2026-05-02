const express = require("express");
const router = express.Router();

const {
  updateProductQuantity,
  insertPayment,
  insertCustomer,
  insertSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoiceById,
  getAllSaleDetails,
  getSaleDetailsByInvoice,
  getAllCustomers,
  getCustomerById,
  getAllCategories,
  getCategoryById,
  getAllProducts,
  getProductById
} = require("../controllers/salesController");

router.patch("/update-soluong-sanpham", updateProductQuantity);
router.post("/insert-thanhtoan", insertPayment);
router.post("/insert-khachhang", insertCustomer);
router.post("/insert-hoadonban", insertSalesInvoice);

router.get("/get-all-hoadonban", getAllSalesInvoices);
router.get("/get-hoadonban-by-id", getSalesInvoiceById);
router.get("/get-all-chitietban", getAllSaleDetails);
router.get("/get-chitietban-by-IDhoadon", getSaleDetailsByInvoice);

router.get("/get-all-khachhang", getAllCustomers);
router.get("/get-byid-khachhang", getCustomerById);

router.get("/get-all-danhmuc", getAllCategories);
router.get("/get-byID-danhmuc", getCategoryById);

router.get("/get-all-sanpham", getAllProducts);
router.get("/get-sanpham-by-id", getProductById);

module.exports = router;
