import React, { useEffect, useState } from 'react';
import { categories as seedCategories } from '../data/mockData';
import { api } from '../services/api';

const QuanLyDanhMuc = () => {
  const [items, setItems] = useState(seedCategories);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.categories.list().then((data) => Array.isArray(data) && setItems(data)).catch(() => {});
  }, []);

  const filteredItems = items.filter((item) =>
    [item.id, item.name, item.description].some((value) => value.toLowerCase().includes(search.toLowerCase())),
  );

  const saveCategory = async (event) => {
    event.preventDefault();
    const payload = { MADANHMUC: form.id, TENDANHMUC: form.name, MOTA: form.description };
    if (items.some((item) => item.id === form.id)) await api.categories.update(payload);
    else await api.categories.create(payload);
    setItems((current) =>
      current.some((item) => item.id === form.id)
        ? current.map((item) => (item.id === form.id ? form : item))
        : [...current, form],
    );
    setForm(null);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Kho hàng / Danh mục</p>
          <h1 className="h1">Quản lý danh mục điện máy</h1>
        </div>
        <button className="btn" onClick={() => setForm({ id: `DM${String(items.length + 1).padStart(2, '0')}`, name: '', description: '' })}>Thêm danh mục</button>
      </header>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Danh sách danh mục</h2>
          <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm danh mục..." style={{ maxWidth: 360 }} />
        </div>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã</th><th>Tên danh mục</th><th>Mô tả</th><th>Thao tác</th></tr></thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="table-actions">
                    <button className="btn secondary" onClick={() => setForm(item)}>Sửa</button>
                    <button className="btn danger" onClick={async () => { await api.categories.remove(item.id); setItems(items.filter((x) => x.id !== item.id)); }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {form && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Thông tin danh mục</h3>
              <button className="close" onClick={() => setForm(null)} type="button">×</button>
            </div>
            <form onSubmit={saveCategory}>
              <div className="form-grid">
                <div><label>Mã danh mục</label><input className="input" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required /></div>
                <div><label>Tên danh mục</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              </div>
              <div style={{ marginTop: 14 }}>
                <label>Mô tả</label>
                <textarea className="input" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn secondary" onClick={() => setForm(null)}>Hủy</button>
                <button type="submit" className="btn">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyDanhMuc;
