const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

const request = async (path, options = {}) => {
  const { params, ...fetchOptions } = options;
  const response = await fetch(buildUrl(path, params), {
    headers: { 'Content-Type': 'application/json', ...(fetchOptions.headers || {}) },
    ...fetchOptions,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'Không thể kết nối API';
    throw new Error(message);
  }

  return payload?.data ?? payload;
};

const body = (data) => JSON.stringify(data);

export const api = {
  login: (credentials) => request('/Login/login', { method: 'POST', body: body(credentials) }),

  categories: {
    list: () => request('/QuanLyDanhMuc/get-all-danhmuc'),
    create: (data) => request('/QuanLyDanhMuc/insert-danhmuc', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLyDanhMuc/update-danhmuc', { method: 'PUT', body: body(data) }),
    remove: (id) => request('/QuanLyDanhMuc/delete-danhmuc', { method: 'DELETE', params: { madanhmuc: id } }),
  },

  products: {
    list: () => request('/QuanLySanPham/get-all-sanpham'),
    create: (data) => request('/QuanLySanPham/insert-sanpham', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLySanPham/update-sanpham', { method: 'PUT', body: body(data) }),
    updateStock: (id, stock) => request('/QuanLySanPham/update-soluong-sanpham', { method: 'PATCH', params: { maSP: id, soLuongMoi: stock } }),
    remove: (id) => request('/QuanLySanPham/delete-sanpham', { method: 'DELETE', params: { maSP: id } }),
  },

  store: {
    products: () => request('/CuaHang/products'),
    createOrder: (data) => request('/CuaHang/orders', { method: 'POST', body: body(data) }),
    orders: () => request('/CuaHang/orders'),
    updateOrderStatus: (data) => request('/CuaHang/orders/status', { method: 'POST', body: body(data) }),
  },

  employees: {
    list: () => request('/QuanLyNhanVien/get-all-nhanvien'),
    create: (data) => request('/QuanLyNhanVien/create-nhanvien', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLyNhanVien/update-nhanvien', { method: 'POST', body: body(data) }),
    remove: (id) => request('/QuanLyNhanVien/delete-nhanvien', { method: 'DELETE', params: { maNV: id } }),
  },

  accounts: {
    list: () => request('/QuanLyTaiKhoan/get-all-taikhoan'),
    create: (data) => request('/QuanLyTaiKhoan/create-taikhoan', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLyTaiKhoan/update-byID-taikhoan', { method: 'POST', body: body(data) }),
    remove: (id) => request('/QuanLyTaiKhoan/del-byID-taikhoan', { method: 'DELETE', params: { maTK: id } }),
  },

  promotions: {
    list: () => request('/QuanLyKhuyenMai/get-all-khuyenmai'),
    create: (data) => request('/QuanLyKhuyenMai/create-khuyenmai', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLyKhuyenMai/update-khuyenmai', { method: 'POST', body: body(data) }),
    remove: (id) => request('/QuanLyKhuyenMai/del-khuyenmai', { method: 'DELETE', params: { maKM: id } }),
  },

  suppliers: {
    list: () => request('/QuanLyNhapKho/get-all-nhacungcap'),
    create: (data) => request('/QuanLyNhapKho/create-nhacungcap', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLyNhapKho/update-nhacungcap', { method: 'POST', body: body(data) }),
    remove: (id) => request('/QuanLyNhapKho/del-nhacungcap', { method: 'DELETE', params: { maNCC: id } }),
  },

  receipts: {
    list: () => request('/QuanLyNhapKho/get-all-phieunhapkho'),
    create: (data) => request('/QuanLyNhapKho/create-phieunhapkho', { method: 'POST', body: body(data) }),
    update: (data) => request('/QuanLyNhapKho/update-phieunhapkho', { method: 'POST', body: body(data) }),
    remove: (id) => request('/QuanLyNhapKho/delete-phieunhapkho', { method: 'DELETE', params: { maPhieuNhap: id } }),
  },

  receiptDetails: {
    list: () => request('/QuanLyNhapKho/get-all-chitietnhap'),
    create: (data) => request('/QuanLyNhapKho/create-chitietnhap', { method: 'POST', body: body(data) }),
  },

  sales: {
    customers: () => request('/QuanLyBanHang/get-all-khachhang'),
    createCustomer: (data) => request('/QuanLyBanHang/insert-khachhang', { method: 'POST', body: body(data) }),
    createInvoice: (data) => request('/QuanLyBanHang/insert-hoadonban', { method: 'POST', body: body(data) }),
    createPayment: (data) => request('/QuanLyBanHang/insert-thanhtoan', { method: 'POST', body: body(data) }),
    invoices: () => request('/QuanLyBanHang/get-all-hoadonban'),
  },
};

export { API_BASE_URL };
