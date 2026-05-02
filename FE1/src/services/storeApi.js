const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const fallbackImage = '/products/tivi-01-smart-tivi-qled-samsung-4k-55-inch-qa55q65d.jpg';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || payload.detail || 'Không thể kết nối API.');
  }
  return Object.prototype.hasOwnProperty.call(payload, 'data') ? payload.data : payload;
};

export const formatNumberPrice = (value) => Number(value || 0).toLocaleString('vi-VN');

const inferGroup = (product) => {
  const text = `${product.category || ''} ${product.name || ''}`.toLowerCase();
  if (text.includes('tivi') || text.includes('tv')) return 'tivi';
  if (text.includes('giặt')) return 'may-giat';
  if (text.includes('điều hòa') || text.includes('dieu hoa') || text.includes('máy lạnh')) return 'dieu-hoa';
  if (text.includes('nồi cơm')) return 'noi-com-dien';
  if (text.includes('ấm') || text.includes('bình đun')) return 'am-sieu-toc';
  return 'dien-may';
};

export const mapStoreProduct = (product) => {
  const price = Number(product.price ?? product.DONGIA ?? 0);
  const oldPrice = Math.round(price * 1.1);
  const category = product.category || product.TENDANHMUC || 'Điện máy';
  const mapped = {
    ...product,
    code: product.code || product.id || product.MASP,
    id: product.id || product.MASP || product.code,
    name: product.name || product.TENSP || 'Sản phẩm',
    image: product.image || product.HINHANH || fallbackImage,
    price: formatNumberPrice(price),
    priceValue: price,
    oldPrice: formatNumberPrice(oldPrice),
    category,
    group: product.group || inferGroup({ ...product, category, name: product.name || product.TENSP }),
    gift: product.gift || 'Bảo hành chính hãng, hỗ trợ giao hàng tận nơi',
    stock: Number(product.stock ?? product.SOLUONGTON ?? 0),
  };
  return mapped;
};

export const storeApi = {
  async products() {
    const products = await request('/CuaHang/products');
    return Array.isArray(products) ? products.map(mapStoreProduct) : [];
  },

  async createOrder(order) {
    return request('/CuaHang/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  async orders(params = {}) {
    const search = new URLSearchParams(params);
    const query = search.toString() ? `?${search}` : '';
    return request(`/CuaHang/orders${query}`);
  },
};
