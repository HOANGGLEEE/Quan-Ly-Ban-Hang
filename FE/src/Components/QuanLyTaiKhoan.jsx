import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const roles = {
  admin: 'Quản trị',
  cashier: 'Thu ngân',
  warehouse: 'Thủ kho',
  accountant: 'Kế toán',
};

const QuanLyTaiKhoan = () => {
  const [accounts, setAccounts] = useState([
    { id: 'TK001', username: 'admin', role: 'admin' },
    { id: 'TK002', username: 'thungan01', role: 'cashier' },
    { id: 'TK003', username: 'thukho01', role: 'warehouse' },
  ]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.accounts.list().then((data) => Array.isArray(data) && setAccounts(data)).catch(() => {});
  }, []);

  const filteredAccounts = useMemo(() => {
    const keyword = search.toLowerCase();
    return accounts.filter((item) =>
      [item.id, item.username, roles[item.role] || item.role].some((value) => String(value || '').toLowerCase().includes(keyword)),
    );
  }, [accounts, search]);

  const saveAccount = async (event) => {
    event.preventDefault();
    const roleValue = { admin: 1, cashier: 2, warehouse: 3, accountant: 4 }[form.role] || Number(form.role) || 2;
    const payload = { MATAIKHOAN: form.id, USERNAME: form.username, PASS: form.password || form.PASS || '', QUYEN: roleValue };
    if (accounts.some((item) => item.id === form.id)) await api.accounts.update(payload);
    else await api.accounts.create(payload);
    setAccounts((current) =>
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
          <p className="breadcrumbs">Quản trị / Tài khoản</p>
          <h1 className="h1">Quản lý tài khoản</h1>
        </div>
        <button className="btn" onClick={() => setForm({ id: `TK${String(accounts.length + 1).padStart(3, '0')}`, username: '', role: 'cashier', password: '' })}>Thêm tài khoản</button>
      </header>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Danh sách tài khoản nhân viên</h2>
          <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm mã, username, quyền..." style={{ maxWidth: 360 }} />
        </div>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã TK</th><th>Username</th><th>Quyền</th><th>Thao tác</th></tr></thead>
            <tbody>
              {filteredAccounts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{roles[item.role] || item.role}</td>
                  <td className="table-actions">
                    <button className="btn secondary" onClick={() => setForm({ ...item, password: '' })}>Sửa</button>
                    <button className="btn danger" onClick={async () => { await api.accounts.remove(item.id); setAccounts(accounts.filter((x) => x.id !== item.id)); }}>Xóa</button>
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
              <h3>Thông tin tài khoản</h3>
              <button className="close" onClick={() => setForm(null)} type="button">×</button>
            </div>
            <form onSubmit={saveAccount}>
              <div className="form-grid">
                <div><label>Mã tài khoản</label><input className="input" value={form.id} readOnly /></div>
                <div><label>Username</label><input className="input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></div>
                <div><label>Mật khẩu</label><input className="input" type="password" value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Nhập khi tạo hoặc đổi mật khẩu" /></div>
                <div><label>Quyền</label><select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>{Object.entries(roles).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>
              </div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setForm(null)}>Hủy</button><button className="btn">Lưu</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyTaiKhoan;
