const express = require("express");
const cors = require("cors");

const { authenticate } = require("./auth");
const authRoutes = require("./routes/authRoutes");
const salesRoutes = require("./routes/salesRoutes");
const legacyRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ name: "Project_QuanLyBanLe_Node", status: "running" });
});

app.use("/api/Login", authRoutes);
app.use("/api-common/Login", authRoutes);

app.use("/api/QuanLyBanHang", authenticate, salesRoutes);
app.use("/api-thungan/QuanLyBanHang", authenticate, salesRoutes);
app.use("/api/sales", authenticate, salesRoutes);

app.use(legacyRoutes());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Loi: " + err.message });
});

module.exports = app;
