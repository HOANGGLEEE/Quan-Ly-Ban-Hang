import React, { useEffect, useState } from 'react';
import { employees as seedEmployees } from '../data/mockData';
import { api } from '../services/api';

const QuanLyNhanVien = () => {
  const [employees, setEmployees] = useState(seedEmployees);
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.employees.list().then((data) => Array.isArray(data) && setEmployees(data)).catch(() => {});
  }, []);

  const saveEmployee = async (event) => {
    event.preventDefault();
    const payload = { MANV: form.id, TENNV: form.name, SDT: form.phone, DIACHI: form.address || form.role || '' };
    if (employees.some((item) => item.id === form.id)) await api.employees.update(payload);
    else await api.employees.create(payload);
    setEmployees((current) =>
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
          <p className="breadcrumbs">Quản trị / Nhân viên</p>
          <h1 className="h1">Quản lý nhân viên</h1>
        </div>
        <button className="btn" onClick={() => setForm({ id: `NV${String(employees.length + 1).padStart(3, '0')}`, name: '', role: 'Thu ngân', phone: '', status: 'Đang làm' })}>Thêm nhân viên</button>
      </header>

      <section className="card">
        <h2 className="h2">Danh sách nhân viên</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã NV</th><th>Họ tên</th><th>Vai trò</th><th>Điện thoại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {employees.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.phone}</td>
                  <td><span className="badge success">{item.status}</span></td>
                  <td className="table-actions">
                    <button className="btn secondary" onClick={() => setForm(item)}>Sửa</button>
                    <button className="btn danger" onClick={async () => { await api.employees.remove(item.id); setEmployees(employees.filter((x) => x.id !== item.id)); }}>Xóa</button>
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
            <div className="modal-header"><h3>Thông tin nhân viên</h3><button className="close" onClick={() => setForm(null)} type="button">×</button></div>
            <form onSubmit={saveEmployee}>
              <div className="form-grid">
                <div><label>Mã NV</label><input className="input" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required /></div>
                <div><label>Họ tên</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                <div><label>Vai trò</label><select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option>Thu ngân</option><option>Thủ kho</option><option>Kế toán</option><option>Quản trị</option></select></div>
                <div><label>Điện thoại</label><input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, '') })} /></div>
              </div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setForm(null)}>Hủy</button><button className="btn">Lưu</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyNhanVien;
