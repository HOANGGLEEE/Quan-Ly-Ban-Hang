import React, { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '../data/mockData';
import { api } from '../services/api';
import { notifyError, notifySuccess } from '../utils/notifications';

const statusOptions = ['Cho xac nhan', 'Da xac nhan', 'Dang giao', 'Da giao'];
const shippingOptions = ['Cho giao', 'Dang giao', 'Da giao'];

const QuanLyDonOnline = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [shippingForm, setShippingForm] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await api.store.orders();
      if (Array.isArray(data)) setOrders(data);
    } catch (error) {
      notifyError(error, 'Không thể tải đơn online');
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return orders.filter((item) =>
      [item.id, item.customerName, item.phone, item.status, item.shippingStatus]
        .some((value) => String(value || '').toLowerCase().includes(keyword)),
    );
  }, [orders, search]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.store.updateOrderStatus({ orderId, status });
      await loadOrders();
      notifySuccess('Đã cập nhật trạng thái đơn');
    } catch (error) {
      notifyError(error, 'Không thể cập nhật đơn hàng');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.store.cancelOrder({ orderId });
      await loadOrders();
      notifySuccess('Đã hủy đơn và hoàn tồn kho');
    } catch (error) {
      notifyError(error, 'Không thể hủy đơn hàng');
    }
  };

  const saveShipping = async (event) => {
    event.preventDefault();
    try {
      await api.store.updateShipping(shippingForm);
      await loadOrders();
      notifySuccess('Đã cập nhật vận chuyển');
      setShippingForm(null);
    } catch (error) {
      notifyError(error, 'Không thể cập nhật vận chuyển');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Cửa hàng / Đơn online</p>
          <h1 className="h1">Quản lý đơn hàng online</h1>
        </div>
      </header>

      <div className="grid grid-3">
        <div className="stat-card"><div className="stat-label">Tổng đơn</div><div className="stat-value">{orders.length}</div></div>
        <div className="stat-card"><div className="stat-label">Chờ xử lý</div><div className="stat-value">{orders.filter((item) => String(item.status || '').includes('Cho')).length}</div></div>
        <div className="stat-card"><div className="stat-label">Doanh thu online</div><div className="stat-value">{formatCurrency(orders.reduce((sum, item) => sum + Number(item.total || 0), 0))}</div></div>
      </div>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Danh sách đơn online</h2>
          <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm đơn, khách hàng, trạng thái..." style={{ maxWidth: 360 }} />
        </div>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày đặt</th><th>Tổng tiền</th><th>Đơn hàng</th><th>Vận chuyển</th><th>Mã vận đơn</th><th>Thao tác</th></tr></thead>
            <tbody>
              {filteredOrders.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customerName}<div className="small">{item.phone}</div></td>
                  <td>{String(item.date || '').slice(0, 10)}</td>
                  <td>{formatCurrency(item.total)}</td>
                  <td>
                    <select className="input" value={item.status || ''} onChange={(e) => updateStatus(item.id, e.target.value)}>
                      {statusOptions.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                  <td><span className="badge success">{item.shippingStatus || 'Cho giao'}</span></td>
                  <td>{item.trackingCode || '-'}</td>
                  <td className="table-actions">
                    <button className="btn secondary" onClick={() => setShippingForm({
                      orderId: item.id,
                      carrier: item.carrier || '',
                      trackingCode: item.trackingCode || '',
                      shippingStatus: item.shippingStatus || 'Cho giao',
                      shippingFee: item.shippingFee || 0,
                      expectedDelivery: item.expectedDelivery?.slice?.(0, 10) || '',
                      deliveredAt: item.deliveredAt?.slice?.(0, 10) || '',
                    })}>Vận chuyển</button>
                    <button className="btn danger" disabled={String(item.status || '').toLowerCase().includes('huy')} onClick={() => cancelOrder(item.id)}>Hủy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {shippingForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header"><h3>Cập nhật vận chuyển</h3><button className="close" type="button" onClick={() => setShippingForm(null)}>×</button></div>
            <form onSubmit={saveShipping}>
              <div className="form-grid">
                <div><label>Mã đơn</label><input className="input" value={shippingForm.orderId} readOnly /></div>
                <div><label>Đơn vị vận chuyển</label><input className="input" value={shippingForm.carrier} onChange={(e) => setShippingForm({ ...shippingForm, carrier: e.target.value })} /></div>
                <div><label>Mã vận đơn</label><input className="input" value={shippingForm.trackingCode} onChange={(e) => setShippingForm({ ...shippingForm, trackingCode: e.target.value })} /></div>
                <div><label>Trạng thái giao</label><select className="input" value={shippingForm.shippingStatus} onChange={(e) => setShippingForm({ ...shippingForm, shippingStatus: e.target.value })}>{shippingOptions.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div><label>Phí vận chuyển</label><input className="input" type="number" min="0" value={shippingForm.shippingFee} onChange={(e) => setShippingForm({ ...shippingForm, shippingFee: e.target.value })} /></div>
                <div><label>Ngày giao dự kiến</label><input className="input" type="date" value={shippingForm.expectedDelivery} onChange={(e) => setShippingForm({ ...shippingForm, expectedDelivery: e.target.value })} /></div>
                <div><label>Ngày giao thực tế</label><input className="input" type="date" value={shippingForm.deliveredAt} onChange={(e) => setShippingForm({ ...shippingForm, deliveredAt: e.target.value })} /></div>
              </div>
              <div className="form-actions"><button type="button" className="btn secondary" onClick={() => setShippingForm(null)}>Hủy</button><button className="btn">Lưu vận chuyển</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyDonOnline;
