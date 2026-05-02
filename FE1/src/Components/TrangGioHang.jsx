import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/cart.css';
import { formatPrice, getCartItems, parsePrice, saveCartItems } from '../utils/cart';

const shippingFee = 30000;

const TrangGioHang = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getCartItems());
  const [voucher, setVoucher] = useState('');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/e80f60032e.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    saveCartItems(items);
  }, [items]);

  const selectedItems = items.filter((item) => item.selected !== false);
  const subtotal = useMemo(
    () => selectedItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0),
    [selectedItems],
  );
  const discount = voucher.trim().toUpperCase() === 'SALE10' ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(subtotal + (selectedItems.length ? shippingFee : 0) - discount, 0);

  const updateQuantity = (code, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item.code === code ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  const removeItem = (code) => {
    setItems((current) => current.filter((item) => item.code !== code));
  };

  const toggleItem = (code) => {
    setItems((current) =>
      current.map((item) =>
        item.code === code ? { ...item, selected: item.selected === false } : item,
      ),
    );
  };

  const toggleAll = (checked) => {
    setItems((current) => current.map((item) => ({ ...item, selected: checked })));
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    if (!selectedItems.length) {
      setMessage('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setMessage('Vui lòng nhập họ tên, số điện thoại và địa chỉ nhận hàng.');
      return;
    }

    const order = {
      id: `DH${Date.now()}`,
      items: selectedItems,
      customer,
      total,
      createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...orders]));
    setItems((current) => current.filter((item) => item.selected === false));
    setMessage(`Đặt hàng thành công. Mã đơn hàng của bạn là ${order.id}.`);
  };

  return (
    <>
      <header>
        <img style={{ width: '964.8px' }} src="/AnhDau.PNG" alt="" />
      </header>
      <nav>
        <div className="container">
          <ul>
            <li><Link to="/"><img style={{ width: '150px' }} src="/logo.PNG" alt="Logo" /></Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/cart"><button><i className="fa-solid fa-cart-shopping"></i> Giỏ hàng</button></Link></li>
            <li><Link to="/login">Đăng nhập</Link></li>
          </ul>
        </div>
      </nav>

      <main className="cart-page">
        <div className="container">
          <div className="cart-header">
            <div>
              <span>Giỏ hàng của bạn</span>
              <h1>Kiểm tra sản phẩm trước khi thanh toán</h1>
            </div>
            <Link to="/products">Tiếp tục mua sắm</Link>
          </div>

          {message && <div className="cart-message">{message}</div>}

          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon"><i className="fa-solid fa-cart-shopping"></i></div>
              <h2>Giỏ hàng đang trống</h2>
              <p>Hãy chọn thêm tivi, tủ lạnh, máy giặt hoặc đồ gia dụng để bắt đầu đơn hàng.</p>
              <button type="button" onClick={() => navigate('/products')}>Mua sắm ngay</button>
            </div>
          ) : (
            <div className="cart-layout">
              <section className="cart-items">
                <div className="cart-items-toolbar">
                  <label>
                    <input
                      type="checkbox"
                      checked={items.every((item) => item.selected !== false)}
                      onChange={(event) => toggleAll(event.target.checked)}
                    />
                    Chọn tất cả ({items.length})
                  </label>
                  <button type="button" onClick={() => setItems([])}>Xóa giỏ hàng</button>
                </div>

                {items.map((item) => (
                  <article className="cart-item" key={item.code}>
                    <input
                      type="checkbox"
                      checked={item.selected !== false}
                      onChange={() => toggleItem(item.code)}
                    />
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <span>{item.category}</span>
                      <h3>{item.name}</h3>
                      <p>Mã: {item.code}</p>
                      <button type="button" onClick={() => removeItem(item.code)}>Xóa</button>
                    </div>
                    <div className="cart-price">
                      {item.oldPrice && <del>{item.oldPrice}đ</del>}
                      <strong>{item.price}đ</strong>
                    </div>
                    <div className="cart-quantity">
                      <button type="button" onClick={() => updateQuantity(item.code, item.quantity - 1)}>-</button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.code, Number(event.target.value))}
                      />
                      <button type="button" onClick={() => updateQuantity(item.code, item.quantity + 1)}>+</button>
                    </div>
                  </article>
                ))}
              </section>

              <aside className="cart-summary">
                <form onSubmit={handleCheckout}>
                  <h2>Thông tin thanh toán</h2>
                  <label>
                    Họ tên người nhận
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
                    />
                  </label>
                  <label>
                    Số điện thoại
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                    />
                  </label>
                  <label>
                    Địa chỉ nhận hàng
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
                    />
                  </label>
                  <label>
                    Ghi chú
                    <textarea
                      value={customer.note}
                      onChange={(event) => setCustomer({ ...customer, note: event.target.value })}
                      rows="3"
                    />
                  </label>

                  <div className="cart-voucher">
                    <input
                      type="text"
                      value={voucher}
                      onChange={(event) => setVoucher(event.target.value)}
                      placeholder="Nhập mã SALE10"
                    />
                  </div>

                  <div className="cart-total-row">
                    <span>Tạm tính</span>
                    <b>{formatPrice(subtotal)}</b>
                  </div>
                  <div className="cart-total-row">
                    <span>Phí giao hàng</span>
                    <b>{selectedItems.length ? formatPrice(shippingFee) : formatPrice(0)}</b>
                  </div>
                  <div className="cart-total-row">
                    <span>Giảm giá</span>
                    <b>-{formatPrice(discount)}</b>
                  </div>
                  <div className="cart-grand-total">
                    <span>Tổng thanh toán</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>

                  <button type="submit" className="cart-checkout">Đặt hàng</button>
                </form>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default TrangGioHang;
