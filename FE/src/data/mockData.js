export const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export const categories = [
  { id: 'DM01', name: 'Tivi', description: 'Smart TV, OLED, QLED và phụ kiện hình ảnh' },
  { id: 'DM02', name: 'Tủ lạnh', description: 'Tủ lạnh gia đình, side-by-side, inverter' },
  { id: 'DM03', name: 'Máy giặt', description: 'Máy giặt cửa trước, cửa trên, máy sấy' },
  { id: 'DM04', name: 'Điện thoại', description: 'Smartphone, phụ kiện di động' },
  { id: 'DM05', name: 'Laptop', description: 'Laptop văn phòng, gaming, phụ kiện máy tính' },
];

export const products = [
  { id: 'SP001', name: 'Smart TV Samsung 55 inch 4K', category: 'Tivi', barcode: '893100001', price: 12990000, vat: 10, stock: 18, attributes: '55 inch - 4K - Tizen OS' },
  { id: 'SP002', name: 'Tủ lạnh LG Inverter 315L', category: 'Tủ lạnh', barcode: '893100002', price: 9490000, vat: 10, stock: 9, attributes: '315L - Inverter - Ngăn đá trên' },
  { id: 'SP003', name: 'Máy giặt Electrolux 10kg', category: 'Máy giặt', barcode: '893100003', price: 8390000, vat: 10, stock: 7, attributes: 'Cửa trước - 10kg - Inverter' },
  { id: 'SP004', name: 'iPhone 15 128GB', category: 'Điện thoại', barcode: '893100004', price: 19990000, vat: 10, stock: 22, attributes: '128GB - Đen' },
  { id: 'SP005', name: 'Laptop Asus Vivobook 15', category: 'Laptop', barcode: '893100005', price: 13990000, vat: 10, stock: 5, attributes: 'Core i5 - 16GB RAM - 512GB SSD' },
];

export const employees = [
  { id: 'NV001', name: 'Nguyễn Minh Anh', role: 'Thu ngân', phone: '0901234567', status: 'Đang làm' },
  { id: 'NV002', name: 'Trần Quốc Bảo', role: 'Thủ kho', phone: '0912345678', status: 'Đang làm' },
  { id: 'NV003', name: 'Lê Thanh Hà', role: 'Kế toán', phone: '0923456789', status: 'Đang làm' },
];

export const invoices = [
  {
    id: 'HD001',
    customer: 'Nguyễn Văn A',
    phone: '0909009001',
    date: '2026-04-28',
    status: 'Đã thanh toán',
    items: [
      { productId: 'SP001', name: 'Smart TV Samsung 55 inch 4K', quantity: 1, price: 12990000 },
      { productId: 'SP004', name: 'iPhone 15 128GB', quantity: 1, price: 19990000 },
    ],
  },
  {
    id: 'HD002',
    customer: 'Công ty An Phát',
    phone: '0283999888',
    date: '2026-04-29',
    status: 'Còn nợ',
    items: [
      { productId: 'SP005', name: 'Laptop Asus Vivobook 15', quantity: 3, price: 13990000 },
    ],
  },
];

export const suppliers = [
  { id: 'NCC01', name: 'Samsung Việt Nam', address: 'TP. Hồ Chí Minh', phone: '0287300001', email: 'sales@samsung.vn' },
  { id: 'NCC02', name: 'LG Electronics', address: 'Hà Nội', phone: '0247300002', email: 'order@lg.vn' },
  { id: 'NCC03', name: 'FPT Trading', address: 'Đà Nẵng', phone: '0236730003', email: 'contact@fpttrading.vn' },
];
