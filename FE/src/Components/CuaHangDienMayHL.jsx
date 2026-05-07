import React, { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingCart, Trash2 } from 'lucide-react';
import { formatCurrency, products as seedProducts } from '../data/mockData';
import { api } from '../services/api';
import { notifyError, notifySuccess } from '../utils/notifications';
import { useAppStore } from '../store/AppStoreCore';

const defaultCustomer = { id: '', name: '', phone: '', address: '' };

const CuaHangDienMayHL = ({ onLoginClick }) => {
  const [products, setProducts] = useState(seedProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [customer, setCustomer] = useState(defaultCustomer);
  const [note, setNote] = useState('');
  const [result, setResult] = useState(null);
  const {
    state,
    storeCartSubtotal,
    addStoreCartItem,
    updateStoreCartQuantity,
    removeStoreCartItem,
    clearStoreCart,
  } = useAppStore();
  const cart = state.storeCart;

  const loadStoreProducts = async () => {
    try {
      const data = await api.store.products();
      if (Array.isArray(data)) setProducts(data);
    } catch (error) {
      notifyError(error, 'Không thể tải sản phẩm cửa hàng');
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadStoreProducts);
  }, []);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(products.map((item) => item.category).filter(Boolean)))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return products.filter((item) => {
      const matchesSearch = [item.id, item.name, item.brand, item.category, item.attributes]
        .some((value) => String(value || '').toLowerCase().includes(keyword));
      return matchesSearch && (category === 'all' || item.category === category);
    });
  }, [products, search, category]);

  const addToCart = (product) => {
    setResult(null);
    addStoreCartItem(product);
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    if (!cart.length) return;

    try {
      const order = await api.store.createOrder({
        customer: { ...customer, id: customer.id.trim().toUpperCase() },
        shippingAddress: customer.address,
        note,
        items: cart.map((item) => ({ productId: item.id, quantity: item.quantity, price: item.price })),
      });

      setResult(order);
      clearStoreCart();
      await loadStoreProducts();
      notifySuccess('Đã tạo đơn hàng');
    } catch (error) {
      notifyError(error, 'Không thể tạo đơn hàng');
    }
  };

  return (
    <div className="page store-page">
      <header className="store-header">
        <div>
          <p className="breadcrumbs">Mua sắm</p>
          <h1 className="h1">Cửa hàng điện máy HL</h1>
          <p className="muted">Chọn thiết bị, tạo đơn online và lưu trực tiếp vào hệ thống.</p>
        </div>
        <div className="store-header-actions">
          {onLoginClick && <button className="btn secondary" onClick={onLoginClick}>Đăng nhập quản trị</button>}
          <div className="store-cart-pill"><ShoppingCart size={18} />{cart.length} mặt hàng</div>
        </div>
      </header>

      <section className="store-toolbar">
        <div className="store-search">
          <Search size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm TV, laptop, tủ lạnh, thương hiệu..." />
        </div>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'Tất cả danh mục' : item}</option>)}
        </select>
      </section>

      <div className="store-layout">
        <section className="store-products">
          {filteredProducts.map((item) => (
            <article className="product-tile" key={item.id}>
              <div className="product-image">
                {item.image ? <img src={item.image} alt={item.name} /> : <span>{item.brand || item.category || 'HL'}</span>}
              </div>
              <div className="product-info">
                <div className="small">{item.category} {item.brand ? `- ${item.brand}` : ''}</div>
                <h2>{item.name}</h2>
                <p>{item.attributes || item.description || 'Thiết bị điện máy chính hãng'}</p>
                <div className="product-meta">
                  <strong>{formatCurrency(item.price)}</strong>
                  <span className={`badge ${item.stock <= 5 ? 'warn' : 'success'}`}>Còn {item.stock}</span>
                </div>
                {item.warrantyMonths > 0 && <div className="small">Bảo hành {item.warrantyMonths} tháng</div>}
              </div>
              <button className="btn" disabled={!item.stock} onClick={() => addToCart(item)}>Thêm vào giỏ</button>
            </article>
          ))}
        </section>

        <aside className="checkout-panel">
          <h2 className="h2">Giỏ hàng</h2>
          {cart.length === 0 ? (
            <div className="empty-state">Chưa có sản phẩm trong giỏ.</div>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div><strong>{item.name}</strong><span>{formatCurrency(item.price)}</span></div>
                  <input className="input" type="number" min="1" max={item.stock} value={item.quantity} onChange={(e) => updateStoreCartQuantity(item.id, e.target.value)} />
                  <button className="icon-btn delete" onClick={() => removeStoreCartItem(item.id)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}

          <div className="summary-line"><span>Tạm tính</span><strong>{formatCurrency(storeCartSubtotal)}</strong></div>

          <form onSubmit={submitOrder}>
            <div className="form-grid single">
              <div><label>Mã khách hàng</label><input className="input" value={customer.id} onChange={(e) => setCustomer({ ...customer, id: e.target.value })} placeholder="VD: KH001" required /></div>
              <div><label>Họ tên</label><input className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required /></div>
              <div><label>Số điện thoại</label><input className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value.replace(/[^0-9]/g, '') })} /></div>
              <div><label>Địa chỉ giao hàng</label><input className="input" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} required /></div>
              <div><label>Ghi chú</label><textarea className="input" rows="2" value={note} onChange={(e) => setNote(e.target.value)} /></div>
            </div>
            <button className="btn checkout-btn" disabled={!cart.length}>Đặt hàng</button>
          </form>

          {result && <div className="order-result">Đã tạo đơn {result.orderId} với tổng tiền {formatCurrency(result.total)}.</div>}
        </aside>
      </div>
    </div>
  );
};

export default CuaHangDienMayHL;
