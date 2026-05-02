const express = require("express");
const cors = require("cors");

const loginRoutes = require("./routes/loginRoutes");
const quanLyBanHangRoutes = require("./routes/quanLyBanHangRoutes");
const quanLyCongNoRoutes = require("./routes/quanLyCongNoRoutes");
const quanLyDanhMucRoutes = require("./routes/quanLyDanhMucRoutes");
const quanLyDoiTraRoutes = require("./routes/quanLyDoiTraRoutes");
const quanLyKhuyenMaiRoutes = require("./routes/quanLyKhuyenMaiRoutes");
const quanLyNhanVienRoutes = require("./routes/quanLyNhanVienRoutes");
const quanLyNhapKhoRoutes = require("./routes/quanLyNhapKhoRoutes");
const quanLySanPhamRoutes = require("./routes/quanLySanPhamRoutes");
const quanLyTaiKhoanRoutes = require("./routes/quanLyTaiKhoanRoutes");
const quanLyTonKhoRoutes = require("./routes/quanLyTonKhoRoutes");
const baoCaoThongKeRoutes = require("./routes/baoCaoThongKeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, service: "Project_QuanLyBanLe_Node" });
});

app.use("/api/Login", loginRoutes);
app.use("/api/QuanLyBanHang", quanLyBanHangRoutes);
app.use("/api/QuanLyCongNo", quanLyCongNoRoutes);
app.use("/api/QuanLyDanhMuc", quanLyDanhMucRoutes);
app.use("/api/QuanLyDoiTra", quanLyDoiTraRoutes);
app.use("/api/QuanLyKhuyenMai", quanLyKhuyenMaiRoutes);
app.use("/api/QuanLyNhanVien", quanLyNhanVienRoutes);
app.use("/api/QuanLyNhapKho", quanLyNhapKhoRoutes);
app.use("/api/QuanLySanPham", quanLySanPhamRoutes);
app.use("/api/QuanLyTaiKhoan", quanLyTaiKhoanRoutes);
app.use("/api/QuanLyTonKho", quanLyTonKhoRoutes);
app.use("/api/BaoCaoThongKe", baoCaoThongKeRoutes);

module.exports = app;
