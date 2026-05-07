import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { notifyError, notifySuccess } from '../utils/notifications';

const statusOptions = ['Còn bảo hành', 'Đang xử lý', 'Đã trả khách', 'Hết hạn'];

const QuanLyBaoHanh = () => {
  const [warranties, setWarranties] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState(null);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const [warrantyData, invoiceData] = await Promise.all([api.warranties.list(), api.sales.invoices()]);
      if (Array.isArray(warrantyData)) setWarranties(warrantyData);
      if (Array.isArray(invoiceData)) setInvoices(invoiceData);
    } catch (error) {
      notifyError(error, 'Không thể tải dữ liệu bảo hành');
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadData);
  }, []);

  const invoiceItems = useMemo(() => {
    const invoice = invoices.find((item) => item.id === form?.invoiceId);
    return invoice?.items || [];
  }, [form?.invoiceId, invoices]);

  const filteredWarranties = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return warranties.filter((item) =>
      [item.id, item.invoiceId, item.productName, item.customerName, item.phone, item.status]
        .some((value) => String(value || '').toLowerCase().includes(keyword)),
    );
  }, [search, warranties]);

  const openCreate = () => {
    const invoice = invoices[0] || {};
    const product = invoice.items?.[0] || {};
    setForm({
      invoiceId: invoice.id || '',
      productId: product.productId || '',
      startDate: new Date().toISOString().slice(0, 10),
      note: '',
    });
  };

  const saveWarranty = async (event) => {
    event.preventDefault();
    try {
      await api.warranties.create(form);
      await loadData();
      notifySuccess('Đã tạo phiếu bảo hành');
      setForm(null);
    } catch (error) {
      notifyError(error, 'Không thể tạo phiếu bảo hành');
    }
  };

  const updateStatus = async (item, status) => {
    try {
      await api.warranties.updateStatus({ id: item.id, status, note: item.note || '' });
      await loadData();
      notifySuccess('Đã cập nhật bảo hành');
    } catch (error) {
      notifyError(error, 'Không thể cập nhật bảo hành');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Dịch vụ / Bảo hành</p>
          <h1 className="h1">Quản lý bảo hành</h1>
        </div>
        <button className="btn" onClick={openCreate}>Tạo phiếu bảo hành</button>
      </header>

      <div className="grid grid-3">
        <div className="stat-card"><div className="stat-label">Phiếu bảo hành</div><div className="stat-value">{warranties.length}</div></div>
        <div className="stat-card"><div className="stat-label">Đang xử lý</div><div className="stat-value">{warranties.filter((item) => item.status === 'Đang xử lý').length}</div></div>
        <div className="stat-card"><div className="stat-label">Hết hạn</div><div className="stat-value">{warranties.filter((item) => item.status === 'Hết hạn').length}</div></div>
      </div>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Danh sách bảo hành</h2>
          <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm mã phiếu, hóa đơn, khách hàng..." style={{ maxWidth: 360 }} />
        </div>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã phiếu</th><th>Khách hàng</th><th>Sản phẩm</th><th>Hóa đơn</th><th>Bắt đầu</th><th>Kết thúc</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {filteredWarranties.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customerName || item.customerId}<div className="small">{item.phone}</div></td>
                  <td>{item.productName || item.productId}</td>
                  <td>{item.invoiceId}</td>
                  <td>{String(item.startDate || '').slice(0, 10)}</td>
                  <td>{String(item.endDate || '').slice(0, 10)}</td>
                  <td>
                    <select className="input" value={item.status || ''} onChange={(e) => updateStatus(item, e.target.value)}>
                      {statusOptions.map((status) => <option key={status}>{status}</option>)}
                    </select>
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
            <div className="modal-header"><h3>Tạo phiếu bảo hành</h3><button className="close" type="button" onClick={() => setForm(null)}>×</button></div>
            <form onSubmit={saveWarranty}>
              <div className="form-grid">
                <div><label>Hóa đơn</label><select className="input" value={form.invoiceId} onChange={(e) => setForm({ ...form, invoiceId: e.target.value, productId: '' })}>{invoices.map((item) => <option key={item.id} value={item.id}>{item.id} - {item.customerId}</option>)}</select></div>
                <div><label>Sản phẩm</label><select className="input" value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>{invoiceItems.map((item) => <option key={item.productId} value={item.productId}>{item.productId} - {item.name}</option>)}</select></div>
                <div><label>Ngày bắt đầu</label><input className="input" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
              </div>
              <div style={{ marginTop: 14 }}><label>Ghi chú</label><textarea className="input" rows="3" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setForm(null)}>Hủy</button><button className="btn">Lưu bảo hành</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyBaoHanh;
