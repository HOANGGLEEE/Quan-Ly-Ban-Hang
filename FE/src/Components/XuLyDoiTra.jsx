import React, { useEffect, useState } from 'react';
import { formatCurrency, invoices as seedInvoices } from '../data/mockData';
import { api } from '../services/api';
import { notifyError, notifySuccess } from '../utils/notifications';

const XuLyDoiTra = () => {
  const [invoices, setInvoices] = useState(seedInvoices);
  const [invoiceCode, setInvoiceCode] = useState('HD001');
  const [invoice, setInvoice] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [reason, setReason] = useState('Lỗi kỹ thuật');
  const [returnType, setReturnType] = useState('Trả hàng');
  const [result, setResult] = useState(null);
  const [returnHistory, setReturnHistory] = useState([]);

  const loadReturnData = async () => {
    try {
      const [invoiceData, returnData] = await Promise.all([api.sales.invoices(), api.returns.list()]);
      if (Array.isArray(invoiceData) && invoiceData.length) {
        setInvoices(invoiceData.map((item) => ({ ...item, customer: item.customerId || item.customer || '', phone: item.phone || '', items: item.items || [] })));
      }
      if (Array.isArray(returnData)) setReturnHistory(returnData);
    } catch (error) {
      notifyError(error, 'Không thể tải dữ liệu đổi trả');
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadReturnData);
  }, []);

  const findInvoice = (event) => {
    event.preventDefault();
    const found = invoices.find((item) => item.id === invoiceCode.trim().toUpperCase());
    setInvoice(found || null);
    setSelectedItems({});
    setResult(found ? null : 'Không tìm thấy hóa đơn.');
  };

  const toggleItem = (item) => {
    setSelectedItems((current) => {
      if (current[item.productId]) {
        const next = { ...current };
        delete next[item.productId];
        return next;
      }
      return { ...current, [item.productId]: { ...item, returnQuantity: 1 } };
    });
  };

  const submitReturn = async () => {
    const items = Object.values(selectedItems);
    if (items.length === 0) return;
    try {
      const payload = {
        invoiceId: invoice.id,
        reason,
        type: returnType,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.returnQuantity,
          price: item.price,
        })),
      };
      const created = await api.returns.create(payload);
      const refund = created?.total ?? items.reduce((sum, item) => sum + item.price * item.returnQuantity, 0);
      await loadReturnData();
      setSelectedItems({});
      setResult(`Đã tạo phiếu ${returnType.toLowerCase()} cho ${items.length} sản phẩm. Giá trị xử lý: ${formatCurrency(refund)}. Lý do: ${reason}.`);
      notifySuccess('Đã tạo phiếu đổi/trả và cập nhật tồn kho');
    } catch (error) {
      notifyError(error, 'Không thể tạo phiếu đổi/trả');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Thu ngân / Đổi trả</p>
          <h1 className="h1">Xử lý đổi trả</h1>
        </div>
      </header>

      <section className="card">
        <h2 className="h2">Tìm hóa đơn gốc</h2>
        <form className="row" onSubmit={findInvoice} style={{ marginTop: 14 }}>
          <input className="input" value={invoiceCode} onChange={(e) => setInvoiceCode(e.target.value)} placeholder="Nhập mã hóa đơn, vd: HD001" style={{ maxWidth: 320 }} />
          <button className="btn">Tải hóa đơn</button>
          <button className="btn secondary" type="button" onClick={() => { setInvoice(null); setResult(null); }}>Làm mới</button>
        </form>
      </section>

      {invoice && (
        <>
          <section className="card">
            <div className="grid grid-3">
              <div><div className="small">Mã hóa đơn</div><strong>{invoice.id}</strong></div>
              <div><div className="small">Khách hàng</div><strong>{invoice.customer}</strong></div>
              <div><div className="small">Ngày bán</div><strong>{invoice.date}</strong></div>
            </div>
          </section>

          <section className="card">
            <div className="toolbar">
              <h2 className="h2">Chọn sản phẩm đổi/trả</h2>
              <select className="input" value={reason} onChange={(e) => setReason(e.target.value)} style={{ maxWidth: 260 }}>
                <option>Lỗi kỹ thuật</option>
                <option>Đổi model khác</option>
                <option>Không đúng nhu cầu</option>
                <option>Hàng giao thiếu phụ kiện</option>
              </select>
              <select className="input" value={returnType} onChange={(e) => setReturnType(e.target.value)} style={{ maxWidth: 180 }}>
                <option>Trả hàng</option>
                <option>Đổi hàng</option>
                <option>Bảo hành</option>
              </select>
            </div>
            <div className="table-wrap" style={{ marginTop: 14 }}>
              <table>
                <thead><tr><th>Chọn</th><th>Mã SP</th><th>Sản phẩm</th><th>SL mua</th><th>SL đổi/trả</th><th>Đơn giá</th></tr></thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.productId}>
                      <td><input type="checkbox" checked={Boolean(selectedItems[item.productId])} onChange={() => toggleItem(item)} /></td>
                      <td>{item.productId}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td><input className="input" type="number" min="1" max={item.quantity} value={selectedItems[item.productId]?.returnQuantity || 1} disabled={!selectedItems[item.productId]} onChange={(e) => setSelectedItems({ ...selectedItems, [item.productId]: { ...selectedItems[item.productId], returnQuantity: Number(e.target.value) } })} style={{ width: 110 }} /></td>
                      <td>{formatCurrency(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="form-actions">
              <button className="btn" onClick={submitReturn}>Tạo phiếu đổi/trả</button>
            </div>
          </section>
        </>
      )}

      {result && <section className="card"><strong>{result}</strong></section>}

      <section className="card">
        <h2 className="h2">Lịch sử đổi trả</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Mã phiếu</th><th>Hóa đơn</th><th>Sản phẩm</th><th>SL</th><th>Hình thức</th><th>Giá trị</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {returnHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.invoiceId}</td>
                  <td>{item.productName || item.productId}</td>
                  <td>{item.quantity}</td>
                  <td>{item.type}</td>
                  <td>{formatCurrency(item.value)}</td>
                  <td><span className="badge success">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default XuLyDoiTra;
