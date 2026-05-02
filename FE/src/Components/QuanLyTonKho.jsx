import React, { useEffect, useMemo, useState } from 'react';
import { formatCurrency, products as seedProducts } from '../data/mockData';
import { api } from '../services/api';

const QuanLyTonKho = () => {
  const [items, setItems] = useState(seedProducts);
  const [adjusting, setAdjusting] = useState(null);
  const [adjustType, setAdjustType] = useState('increase');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.products.list().then((data) => Array.isArray(data) && setItems(data)).catch(() => {});
  }, []);

  const lowStock = useMemo(() => items.filter((item) => item.stock <= 7).length, [items]);
  const inventoryValue = useMemo(() => items.reduce((sum, item) => sum + item.stock * item.price, 0), [items]);

  const applyAdjustment = async (event) => {
    event.preventDefault();
    const amount = Math.max(Number(quantity) || 1, 1);
    const nextStock = adjustType === 'increase' ? adjusting.stock + amount : Math.max(adjusting.stock - amount, 0);
    await api.products.updateStock(adjusting.id, nextStock);
    setItems((current) =>
      current.map((item) => {
        if (item.id !== adjusting.id) return item;
        return { ...item, stock: nextStock };
      }),
    );
    setAdjusting(null);
    setQuantity(1);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Kho hàng / Tồn kho</p>
          <h1 className="h1">Quản lý tồn kho</h1>
        </div>
      </header>

      <div className="grid grid-3">
        <div className="stat-card"><div className="stat-label">Mặt hàng</div><div className="stat-value">{items.length}</div></div>
        <div className="stat-card"><div className="stat-label">Sắp hết hàng</div><div className="stat-value">{lowStock}</div></div>
        <div className="stat-card"><div className="stat-label">Giá trị tồn</div><div className="stat-value">{formatCurrency(inventoryValue)}</div></div>
      </div>

      <section className="card">
        <h2 className="h2">Danh sách tồn kho</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã SP</th><th>Tên sản phẩm</th><th>Danh mục</th><th>Giá bán</th><th>Tồn</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{item.stock}</td>
                  <td><span className={`badge ${item.stock <= 7 ? 'warn' : 'success'}`}>{item.stock <= 7 ? 'Cần nhập thêm' : 'Đủ bán'}</span></td>
                  <td><button className="btn secondary" onClick={() => setAdjusting(item)}>Điều chỉnh</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {adjusting && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Điều chỉnh tồn kho</h3>
              <button className="close" type="button" onClick={() => setAdjusting(null)}>×</button>
            </div>
            <form onSubmit={applyAdjustment}>
              <div className="form-grid">
                <div><label>Mã sản phẩm</label><input className="input" value={adjusting.id} readOnly /></div>
                <div><label>Tên sản phẩm</label><input className="input" value={adjusting.name} readOnly /></div>
                <div><label>Loại điều chỉnh</label><select className="input" value={adjustType} onChange={(e) => setAdjustType(e.target.value)}><option value="increase">Tăng tồn</option><option value="decrease">Giảm tồn</option></select></div>
                <div><label>Số lượng</label><input className="input" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn secondary" onClick={() => setAdjusting(null)}>Hủy</button>
                <button type="submit" className="btn">Áp dụng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyTonKho;
