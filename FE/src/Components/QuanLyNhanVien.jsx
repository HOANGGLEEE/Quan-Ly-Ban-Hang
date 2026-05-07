import React, { useEffect, useState } from 'react';
import { employees as seedEmployees } from '../data/mockData';
import { api } from '../services/api';
import { notifyError, notifySuccess } from '../utils/notifications';

const QuanLyNhanVien = () => {
  const [employees, setEmployees] = useState(seedEmployees);
  const [form, setForm] = useState(null);

  const loadEmployees = async () => {
    try {
      const data = await api.employees.list();
      if (Array.isArray(data)) setEmployees(data);
    } catch (error) {
      notifyError(error, 'Không thể tải nhân viên');
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadEmployees);
  }, []);

  const saveEmployee = async (event) => {
    event.preventDefault();
    const normalized = { ...form, address: form.address || '' };
    const payload = { MANV: normalized.id, TENNV: normalized.name, SDT: normalized.phone, DIACHI: normalized.address };
    try {
      const isEdit = employees.some((item) => item.id === form.id);
      if (isEdit) await api.employees.update(payload);
      else await api.employees.create(payload);
      await loadEmployees();
      notifySuccess(isEdit ? 'Đã cập nhật nhân viên' : 'Đã thêm nhân viên');
      setForm(null);
    } catch (error) {
      notifyError(error, 'Không thể lưu nhân viên');
    }
  };

  const removeEmployee = async (id) => {
    try {
      await api.employees.remove(id);
      await loadEmployees();
      notifySuccess('Đã xóa nhân viên');
    } catch (error) {
      notifyError(error, 'Không thể xóa nhân viên');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Quản trị / Nhân viên</p>
          <h1 className="h1">Quản lý nhân viên</h1>
        </div>
        <button className="btn" onClick={() => setForm({ id: `NV${String(employees.length + 1).padStart(3, '0')}`, name: '', phone: '', address: '' })}>Thêm nhân viên</button>
      </header>

      <section className="card">
        <h2 className="h2">Danh sách nhân viên</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã NV</th><th>Họ tên</th><th>Điện thoại</th><th>Địa chỉ</th><th>Thao tác</th></tr></thead>
            <tbody>
              {employees.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td className="table-actions">
                    <button className="btn secondary" onClick={() => setForm(item)}>Sửa</button>
                    <button className="btn danger" onClick={() => removeEmployee(item.id)}>Xóa</button>
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
                <div><label>Điện thoại</label><input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, '') })} /></div>
                <div><label>Địa chỉ</label><input className="input" value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
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
