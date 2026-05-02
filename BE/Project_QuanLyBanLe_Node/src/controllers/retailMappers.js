const roleMap = {
  1: "admin",
  2: "cashier",
  3: "warehouse",
  4: "accountant",
};

const mapDanhMuc = (item) => ({
  ...item,
  id: item.MADANHMUC,
  name: item.TENDANHMUC,
  description: item.MOTA,
});

const mapSanPham = (item) => ({
  ...item,
  id: item.MASP,
  name: item.TENSP,
  categoryId: item.MADANHMUC,
  category: item.TENDANHMUC || item.MADANHMUC,
  barcode: item.MAVACH,
  price: Number(item.DONGIA || 0),
  vat: Number(item.THUEVAT ?? item.THUE ?? 0),
  stock: Number(item.SOLUONGTON || 0),
  attributes: item.THUOCTINH,
  description: item.MOTA,
});

const mapKhachHang = (item) => ({
  ...item,
  id: item.MaKH || item.MAKH,
  name: item.TenKH || item.TENKH,
  phone: item.SDT,
  address: item.DiaChi || item.DIACHI,
});

const mapNhanVien = (item) => ({
  ...item,
  id: item.MANV,
  name: item.TENNV,
  phone: item.SDT,
  address: item.DIACHI,
  status: "Đang làm",
});

const mapTaiKhoan = (item) => ({
  ...item,
  id: item.MATAIKHOAN,
  username: item.USERNAME,
  role: roleMap[item.QUYEN] || String(item.QUYEN || ""),
  password: item.PASS,
  status: "Hoạt động",
});

const mapKhuyenMai = (item) => ({
  ...item,
  id: item.MaKM || item.MAKM,
  name: item.TenKM || item.TENKM,
  productId: item.MaSP || item.MASP,
  startDate: item.NgayBD || item.NGAYBD,
  endDate: item.NgayKT || item.NGAYKT,
});

const mapNhaCungCap = (item) => ({
  ...item,
  id: item.MaNCC || item.MANCC,
  name: item.TenNCC || item.TENNCC,
  address: item.DiaChi || item.DIACHI,
  phone: item.SDT,
  email: item.EMAIL,
});

const mapHoaDon = (item) => ({
  ...item,
  id: item.MAHDBAN,
  employeeId: item.MANV,
  customerId: item.MAKH,
  date: item.NGAYLAP,
  subtotal: Number(item.TONGTIENHANG || 0),
  vat: Number(item.THUEVAT || 0),
  discount: Number(item.GIAMGIA || 0),
  status: item.TrangThai || item.TRANGTHAI,
});

const mapChiTietBan = (item) => ({
  ...item,
  invoiceId: item.MAHDBAN,
  productId: item.MASP,
  name: item.TenSP || item.TENSP,
  quantity: Number(item.SOLUONG || 0),
  price: Number(item.DONGIA || 0),
  total: Number(item.TONGTIEN || 0),
});

const mapThanhToan = (item) => ({
  ...item,
  id: item.MaThanhToan || item.MATHANHTOAN,
  invoiceId: item.MaHDBan || item.MAHDBAN,
  method: item.PhuongThuc || item.PHUONGTHUC,
  amount: Number(item.SoTienThanhToan || item.SOTIENTHANHTOAN || 0),
  date: item.NgayThanhToan || item.NGAYTHANHTOAN,
  status: item.TrangThai || item.TRANGTHAI,
});

const mapPhieuNhap = (item) => ({
  ...item,
  id: item.MAPHIEUNHAP,
  supplierId: item.MANCC,
  employeeId: item.MANV,
  date: item.NGAYLAP,
});

const mapChiTietNhap = (item) => ({
  ...item,
  receiptId: item.MAPHIEUNHAP,
  productId: item.MASP,
  quantity: Number(item.SOLUONG || 0),
  price: Number(item.DONGIANHAP || 0),
  total: Number(item.THANHTIEN || 0),
});

module.exports = {
  mapDanhMuc,
  mapSanPham,
  mapKhachHang,
  mapNhanVien,
  mapTaiKhoan,
  mapKhuyenMai,
  mapNhaCungCap,
  mapHoaDon,
  mapChiTietBan,
  mapThanhToan,
  mapPhieuNhap,
  mapChiTietNhap,
};
