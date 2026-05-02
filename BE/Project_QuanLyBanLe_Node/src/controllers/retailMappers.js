const roleMap = {
  1: "admin",
  2: "cashier",
  3: "warehouse",
  4: "accountant",
};

const trimValue = (value) => (typeof value === "string" ? value.trim() : value);

const trimRow = (item) =>
  Object.fromEntries(Object.entries(item).map(([key, value]) => [key, trimValue(value)]));

const mapDanhMuc = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MADANHMUC),
  name: trimValue(item.TENDANHMUC),
  description: trimValue(item.MOTA),
});

const mapSanPham = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MASP),
  name: trimValue(item.TENSP),
  categoryId: trimValue(item.MADANHMUC),
  category: trimValue(item.TENDANHMUC) || trimValue(item.MADANHMUC),
  barcode: trimValue(item.MAVACH),
  price: Number(item.DONGIA || 0),
  vat: Number(item.THUEVAT ?? item.THUE ?? 0),
  stock: Number(item.SOLUONGTON || 0),
  attributes: trimValue(item.THUOCTINH),
  description: trimValue(item.MOTA),
  image: trimValue(item.HINHANH),
  brand: trimValue(item.THUONGHIEU),
  warrantyMonths: Number(item.THOIGIANBAOHANH || 0),
});

const mapKhachHang = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MaKH || item.MAKH),
  name: trimValue(item.TenKH || item.TENKH),
  phone: trimValue(item.SDT),
  address: trimValue(item.DiaChi || item.DIACHI),
});

const mapNhanVien = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MANV),
  name: trimValue(item.TENNV),
  phone: trimValue(item.SDT),
  address: trimValue(item.DIACHI),
});

const mapTaiKhoan = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MATAIKHOAN),
  username: trimValue(item.USERNAME),
  role: roleMap[item.QUYEN] || String(item.QUYEN || ""),
  password: trimValue(item.PASS),
});

const mapKhuyenMai = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MAKM),
  name: trimValue(item.TENKM),
  productId: trimValue(item.MASP),
  startDate: item.NGAYBATDAU,
  endDate: item.NGAYKETTHUC,
});

const mapNhaCungCap = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MANCC),
  name: trimValue(item.TENNCC),
  address: trimValue(item.DIACHI),
  phone: trimValue(item.SDT),
  email: trimValue(item.EMAIL),
});

const mapHoaDon = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MAHDBAN),
  employeeId: trimValue(item.MANV),
  customerId: trimValue(item.MAKH),
  date: item.NGAYLAP,
  subtotal: Number(item.TONGTIENHANG || 0),
  vat: Number(item.THUEVAT || 0),
  discount: Number(item.GIAMGIA || 0),
  paid: Number(item.DATHANHTOAN || 0),
  status: item.TRANGTHAI,
});

const mapChiTietBan = (item) => ({
  ...trimRow(item),
  invoiceId: trimValue(item.MAHDBAN),
  productId: trimValue(item.MASP),
  name: trimValue(item.TenSP || item.TENSP),
  quantity: Number(item.SOLUONG || 0),
  price: Number(item.DONGIA || 0),
  total: Number(item.TONGTIEN || 0),
});

const mapThanhToan = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MATHANHTOAN),
  invoiceId: trimValue(item.MAHDBAN),
  method: trimValue(item.PHUONGTHUC),
  amount: Number(item.SOTIENTHANHTOAN || 0),
  date: item.NGAYTHANHTOAN,
  status: trimValue(item.TRANGTHAI),
});

const mapPhieuNhap = (item) => ({
  ...trimRow(item),
  id: trimValue(item.MAPHIEUNHAP),
  productId: trimValue(item.MASP),
  supplierId: trimValue(item.MANCC),
  employeeId: trimValue(item.MANV),
  date: item.NGAYLAP,
  vat: Number(item.THUEVAT || 0),
});

const mapChiTietNhap = (item) => ({
  ...trimRow(item),
  receiptId: trimValue(item.MAPHIEUNHAP),
  productId: trimValue(item.MASP),
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
