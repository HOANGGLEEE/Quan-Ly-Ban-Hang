import React, { useMemo, useState } from 'react';
import { formatCurrency, products, suppliers as seedSuppliers } from '../data/mockData';

const QuanLyNhapKho = () => {
  const [suppliers, setSuppliers] = useState(seedSuppliers);
  const [receipts, setReceipts] = useState([
    { id: 'PN001', supplier: 'Samsung Việt Nam', product: 'Smart TV Samsung 55 inch 4K', quantity: 6, unitCost: 10800000, date: '2026-04-25', staff: 'Trần Quốc Bảo' },
    { id: 'PN002', supplier: 'FPT Trading', product: 'Laptop Asus Vivobook 15', quantity: 5, unitCost: 11800000, date: '2026-04-27', staff: 'Trần Quốc Bảo' },
  ]);
  const [receiptForm, setReceiptForm] = useState(null);
  const [supplierForm, setSupplierForm] = useState(null);

  const totalImport = useMemo(() => receipts.reduce((sum, item) => sum + item.quantity * item.unitCost, 0), [receipts]);

  const saveReceipt = (event) => {
    event.preventDefault();
    setReceipts([...receipts, { ...receiptForm, quantity: Number(receiptForm.quantity), unitCost: Number(receiptForm.unitCost) }]);
    setReceiptForm(null);
  };

  const saveSupplier = (event) => {
    event.preventDefault();
    setSuppliers([...suppliers, supplierForm]);
    setSupplierForm(null);
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Kho hàng / Nhập kho</p>
          <h1 className="h1">Quản lý nhập kho</h1>
        </div>
        <div className="actions">
          <button className="btn secondary" onClick={() => setSupplierForm({ id: `NCC${String(suppliers.length + 1).padStart(2, '0')}`, name: '', address: '', phone: '', email: '' })}>Thêm NCC</button>
          <button className="btn" onClick={() => setReceiptForm({ id: `PN${String(receipts.length + 1).padStart(3, '0')}`, supplier: suppliers[0].name, product: products[0].name, quantity: 1, unitCost: products[0].price * 0.85, date: new Date().toISOString().slice(0, 10), staff: 'Trần Quốc Bảo' })}>Thêm phiếu nhập</button>
        </div>
      </header>

      <div className="grid grid-2">
        <div className="stat-card"><div className="stat-label">Phiếu nhập</div><div className="stat-value">{receipts.length}</div></div>
        <div className="stat-card"><div className="stat-label">Tổng giá trị nhập</div><div className="stat-value">{formatCurrency(totalImport)}</div></div>
      </div>

      <section className="card">
        <h2 className="h2">Danh sách phiếu nhập</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã phiếu</th><th>Nhà cung cấp</th><th>Sản phẩm</th><th>SL</th><th>Đơn giá nhập</th><th>Ngày nhập</th><th>Người lập</th></tr></thead>
            <tbody>{receipts.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.supplier}</td><td>{item.product}</td><td>{item.quantity}</td><td>{formatCurrency(item.unitCost)}</td><td>{item.date}</td><td>{item.staff}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 className="h2">Nhà cung cấp</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã NCC</th><th>Tên NCC</th><th>Địa chỉ</th><th>Điện thoại</th><th>Email</th></tr></thead>
            <tbody>{suppliers.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.address}</td><td>{item.phone}</td><td>{item.email}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      {receiptForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header"><h3>Thêm phiếu nhập</h3><button className="close" onClick={() => setReceiptForm(null)} type="button">×</button></div>
            <form onSubmit={saveReceipt}>
              <div className="form-grid">
                <div><label>Mã phiếu</label><input className="input" value={receiptForm.id} readOnly /></div>
                <div><label>Nhà cung cấp</label><select className="input" value={receiptForm.supplier} onChange={(e) => setReceiptForm({ ...receiptForm, supplier: e.target.value })}>{suppliers.map((item) => <option key={item.id}>{item.name}</option>)}</select></div>
                <div><label>Sản phẩm</label><select className="input" value={receiptForm.product} onChange={(e) => setReceiptForm({ ...receiptForm, product: e.target.value })}>{products.map((item) => <option key={item.id}>{item.name}</option>)}</select></div>
                <div><label>Số lượng</label><input className="input" type="number" min="1" value={receiptForm.quantity} onChange={(e) => setReceiptForm({ ...receiptForm, quantity: e.target.value })} /></div>
                <div><label>Đơn giá nhập</label><input className="input" type="number" min="0" value={receiptForm.unitCost} onChange={(e) => setReceiptForm({ ...receiptForm, unitCost: e.target.value })} /></div>
                <div><label>Ngày nhập</label><input className="input" type="date" value={receiptForm.date} onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })} /></div>
              </div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setReceiptForm(null)}>Hủy</button><button className="btn">Lưu phiếu nhập</button></div>
            </form>
          </div>
        </div>
      )}

      {supplierForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header"><h3>Thêm nhà cung cấp</h3><button className="close" onClick={() => setSupplierForm(null)} type="button">×</button></div>
            <form onSubmit={saveSupplier}>
              <div className="form-grid">
                <div><label>Mã NCC</label><input className="input" value={supplierForm.id} readOnly /></div>
                <div><label>Tên NCC</label><input className="input" value={supplierForm.name} onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })} required /></div>
                <div><label>Địa chỉ</label><input className="input" value={supplierForm.address} onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })} /></div>
                <div><label>Điện thoại</label><input className="input" value={supplierForm.phone} onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value.replace(/[^0-9]/g, '') })} /></div>
                <div><label>Email</label><input className="input" type="email" value={supplierForm.email} onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })} /></div>
              </div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setSupplierForm(null)}>Hủy</button><button className="btn">Lưu NCC</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyNhapKho;
