import React, { useEffect, useState } from 'react';
import { products as seedProducts } from '../data/mockData';
import { api } from '../services/api';

const QuanLyKhuyenMai = () => {
  const [products, setProducts] = useState(seedProducts);
  const [promotions, setPromotions] = useState([
    { id: 'KM001', name: 'Giảm 10% TV 4K', productId: 'SP001', discount: 10, start: '2026-04-20', end: '2026-05-15', status: 'Đang chạy' },
    { id: 'KM002', name: 'Ưu đãi laptop mùa tựu trường', productId: 'SP005', discount: 7, start: '2026-04-25', end: '2026-05-31', status: 'Đang chạy' },
  ]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    Promise.all([api.promotions.list(), api.products.list()])
      .then(([promotionData, productData]) => {
        if (Array.isArray(promotionData)) setPromotions(promotionData.map((item) => ({ ...item, start: item.startDate?.slice?.(0, 10) || item.start, end: item.endDate?.slice?.(0, 10) || item.end, discount: item.discount || 0, status: item.status || 'Đang chạy' })));
        if (Array.isArray(productData) && productData.length) setProducts(productData);
      })
      .catch(() => {});
  }, []);

  const savePromotion = async (event) => {
    event.preventDefault();
    const payload = { ...form, discount: Number(form.discount) };
    const dbPayload = { MaKM: payload.id, TenKM: payload.name, MaSP: payload.productId, NgayBD: payload.start, NgayKT: payload.end };
    if (promotions.some((item) => item.id === payload.id)) await api.promotions.update(dbPayload);
    else await api.promotions.create(dbPayload);
    setPromotions((current) =>
      current.some((item) => item.id === payload.id)
        ? current.map((item) => (item.id === payload.id ? payload : item))
        : [...current, payload],
    );
    setForm(null);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Quản trị / Khuyến mãi</p>
          <h1 className="h1">Quản lý khuyến mãi</h1>
        </div>
        <button className="btn" onClick={() => setForm({ id: `KM${String(promotions.length + 1).padStart(3, '0')}`, name: '', productId: products[0].id, discount: 5, start: new Date().toISOString().slice(0, 10), end: new Date().toISOString().slice(0, 10), status: 'Đang chạy' })}>Thêm khuyến mãi</button>
      </header>

      <section className="card">
        <h2 className="h2">Danh sách khuyến mãi</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã KM</th><th>Tên chương trình</th><th>Sản phẩm</th><th>Giảm</th><th>Bắt đầu</th><th>Kết thúc</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {promotions.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.productId}</td>
                  <td>{item.discount}%</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td><span className="badge success">{item.status}</span></td>
                  <td className="table-actions"><button className="btn secondary" onClick={() => setForm(item)}>Sửa</button><button className="btn danger" onClick={async () => { await api.promotions.remove(item.id); setPromotions(promotions.filter((x) => x.id !== item.id)); }}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {form && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header"><h3>Thông tin khuyến mãi</h3><button className="close" onClick={() => setForm(null)} type="button">×</button></div>
            <form onSubmit={savePromotion}>
              <div className="form-grid">
                <div><label>Mã KM</label><input className="input" value={form.id} readOnly /></div>
                <div><label>Tên chương trình</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                <div><label>Sản phẩm</label><select className="input" value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>{products.map((item) => <option key={item.id} value={item.id}>{item.id} - {item.name}</option>)}</select></div>
                <div><label>Phần trăm giảm</label><input className="input" type="number" min="0" max="100" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} /></div>
                <div><label>Ngày bắt đầu</label><input className="input" type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} /></div>
                <div><label>Ngày kết thúc</label><input className="input" type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} /></div>
              </div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setForm(null)}>Hủy</button><button className="btn">Lưu</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyKhuyenMai;
