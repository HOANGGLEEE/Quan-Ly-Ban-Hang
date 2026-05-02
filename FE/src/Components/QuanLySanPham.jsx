import React, { useMemo, useState } from 'react';
import { categories, formatCurrency, products as seedProducts } from '../data/mockData';

const blankProduct = {
  id: '',
  name: '',
  category: 'Tivi',
  barcode: '',
  price: 0,
  vat: 10,
  stock: 0,
  attributes: '',
};

const QuanLySanPham = () => {
  const [items, setItems] = useState(seedProducts);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(blankProduct);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return items.filter((item) =>
      [item.id, item.name, item.category, item.barcode].some((value) => String(value).toLowerCase().includes(keyword)),
    );
  }, [items, search]);

  const openAdd = () => {
    setForm({ ...blankProduct, id: `SP${String(items.length + 1).padStart(3, '0')}` });
    setModal('add');
  };

  const openEdit = (item) => {
    setForm(item);
    setModal('edit');
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), vat: Number(form.vat) };
    setItems((current) =>
      modal === 'edit'
        ? current.map((item) => (item.id === payload.id ? payload : item))
        : [...current, payload],
    );
    setModal(null);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Kho hàng / Sản phẩm</p>
          <h1 className="h1">Quản lý sản phẩm điện máy</h1>
        </div>
        <button className="btn" onClick={openAdd}>Thêm sản phẩm</button>
      </header>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Danh sách sản phẩm</h2>
          <div className="search-container">
            <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm mã, tên, danh mục, mã vạch..." />
            <button className="btn secondary" onClick={() => setSearch('')}>Làm mới</button>
          </div>
        </div>

        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead>
              <tr>
                <th>Mã SP</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Mã vạch</th>
                <th>Giá bán</th>
                <th>VAT</th>
                <th>Tồn</th>
                <th>Thuộc tính</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.barcode}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{item.vat}%</td>
                  <td><span className={`badge ${item.stock <= 5 ? 'warn' : 'success'}`}>{item.stock}</span></td>
                  <td>{item.attributes}</td>
                  <td className="table-actions">
                    <button className="btn secondary" onClick={() => openEdit(item)}>Sửa</button>
                    <button className="btn danger" onClick={() => setItems(items.filter((x) => x.id !== item.id))}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{modal === 'add' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}</h3>
              <button className="close" onClick={() => setModal(null)} type="button">×</button>
            </div>
            <form onSubmit={saveProduct}>
              <div className="form-grid">
                <div><label>Mã sản phẩm</label><input className="input" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required readOnly={modal === 'edit'} /></div>
                <div><label>Tên sản phẩm</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                <div><label>Danh mục</label><select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></div>
                <div><label>Mã vạch</label><input className="input" value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} /></div>
                <div><label>Giá bán</label><input className="input" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
                <div><label>Tồn kho</label><input className="input" type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required /></div>
                <div><label>VAT (%)</label><input className="input" type="number" min="0" max="100" value={form.vat} onChange={(e) => setForm({ ...form, vat: e.target.value })} /></div>
                <div><label>Thuộc tính</label><input className="input" value={form.attributes} onChange={(e) => setForm({ ...form, attributes: e.target.value })} placeholder="VD: 55 inch - 4K" /></div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn secondary" onClick={() => setModal(null)}>Hủy</button>
                <button type="submit" className="btn">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLySanPham;
