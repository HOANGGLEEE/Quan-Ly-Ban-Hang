import React, { useMemo, useState } from 'react';
import { formatCurrency, products } from '../data/mockData';

const customers = {
  KH001: { id: 'KH001', name: 'Nguyễn Văn A', phone: '0909009001', address: 'Quận 1, TP. Hồ Chí Minh' },
  KH002: { id: 'KH002', name: 'Công ty An Phát', phone: '0283999888', address: 'Cầu Giấy, Hà Nội' },
};

const QuanLyBanHang = () => {
  const [customerCode, setCustomerCode] = useState('KH001');
  const [customer, setCustomer] = useState(customers.KH001);
  const [productId, setProductId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
  const [paidInvoice, setPaidInvoice] = useState(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  const handleFindCustomer = () => {
    const found = customers[customerCode.trim().toUpperCase()];
    setCustomer(found || { id: customerCode.toUpperCase(), name: 'Khách lẻ', phone: '', address: '' });
  };

  const handleAddProduct = () => {
    const selected = products.find((item) => item.id === productId);
    const safeQuantity = Math.max(Number(quantity) || 1, 1);
    if (!selected) return;

    setCart((current) => {
      const existed = current.find((item) => item.id === selected.id);
      if (existed) {
        return current.map((item) =>
          item.id === selected.id ? { ...item, quantity: item.quantity + safeQuantity } : item,
        );
      }
      return [...current, { ...selected, quantity: safeQuantity }];
    });
    setQuantity(1);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setPaidInvoice({
      id: `HD${Date.now().toString().slice(-5)}`,
      customer,
      paymentMethod,
      subtotal,
      vat,
      total,
      items: cart,
    });
    setCart([]);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Thu ngân / Quản lý bán hàng</p>
          <h1 className="h1">Quản lý bán hàng điện máy</h1>
        </div>
        <span className="pill">Ca bán: Sáng</span>
      </header>

      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-label">Hàng trong hóa đơn</div>
          <div className="stat-value">{cart.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tạm tính</div>
          <div className="stat-value">{formatCurrency(subtotal)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Thanh toán</div>
          <div className="stat-value">{formatCurrency(total)}</div>
        </div>
      </div>

      <section className="card">
        <h2 className="h2">Thông tin khách hàng</h2>
        <div className="form-grid" style={{ marginTop: 14 }}>
          <div>
            <label>Mã khách hàng</label>
            <div className="row">
              <input className="input" value={customerCode} onChange={(e) => setCustomerCode(e.target.value)} />
              <button className="btn secondary" onClick={handleFindCustomer}>Kiểm tra</button>
            </div>
          </div>
          <div>
            <label>Tên khách hàng</label>
            <input className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          </div>
          <div>
            <label>Địa chỉ giao hàng</label>
            <input className="input" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
          </div>
        </div>
      </section>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Sản phẩm bán</h2>
          <div className="row">
            <select className="input" value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((item) => (
                <option key={item.id} value={item.id}>{item.id} - {item.name}</option>
              ))}
            </select>
            <input className="input" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ width: 110 }} />
            <button className="btn" onClick={handleAddProduct}>Thêm vào hóa đơn</button>
          </div>
        </div>

        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead>
              <tr>
                <th>Mã SP</th>
                <th>Tên sản phẩm</th>
                <th>SL</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr><td colSpan="6" className="muted">Chưa có sản phẩm trong hóa đơn.</td></tr>
              ) : cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.price * item.quantity)}</td>
                  <td><button className="btn secondary" onClick={() => setCart(cart.filter((x) => x.id !== item.id))}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <div className="grid grid-2">
          <div>
            <label>Phương thức thanh toán</label>
            <select className="input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Tiền mặt</option>
              <option>Chuyển khoản</option>
              <option>Thẻ ngân hàng</option>
              <option>Trả góp</option>
            </select>
          </div>
          <div>
            <div className="summary-line"><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></div>
            <div className="summary-line"><span>VAT 10%</span><strong>{formatCurrency(vat)}</strong></div>
            <div className="summary-line"><span>Tổng thanh toán</span><strong>{formatCurrency(total)}</strong></div>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn secondary" onClick={() => setCart([])} disabled={cart.length === 0}>Hủy hóa đơn</button>
          <button className="btn" onClick={handleCheckout} disabled={cart.length === 0}>Thanh toán</button>
        </div>
      </section>

      {paidInvoice && (
        <section className="card">
          <h2 className="h2">Hóa đơn vừa thanh toán: {paidInvoice.id}</h2>
          <p className="muted">Khách hàng {paidInvoice.customer.name} đã thanh toán {formatCurrency(paidInvoice.total)} bằng {paidInvoice.paymentMethod}.</p>
        </section>
      )}
    </div>
  );
};

export default QuanLyBanHang;
