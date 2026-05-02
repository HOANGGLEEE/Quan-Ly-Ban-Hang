import React, { useMemo, useState } from 'react';
import { formatCurrency, invoices, products } from '../data/mockData';

const BaoCaoThongKe = () => {
  const [fromDate, setFromDate] = useState('2026-04-01');
  const [toDate, setToDate] = useState('2026-04-30');
  const [reportType, setReportType] = useState('Doanh thu');

  const revenue = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0),
    [],
  );

  const rows = useMemo(() => {
    if (reportType === 'Doanh thu') {
      return invoices.map((invoice) => ({
        label: invoice.date,
        note: invoice.id,
        value: invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }));
    }
    if (reportType === 'Sản phẩm bán chạy') {
      return invoices.flatMap((invoice) => invoice.items).map((item) => ({
        label: item.name,
        note: item.productId,
        value: item.quantity,
      }));
    }
    return products.map((item) => ({
      label: item.name,
      note: item.id,
      value: item.stock,
    }));
  }, [reportType]);

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Kế toán / Báo cáo</p>
          <h1 className="h1">Báo cáo thống kê</h1>
        </div>
      </header>

      <div className="grid grid-3">
        <div className="stat-card"><div className="stat-label">Doanh thu mẫu</div><div className="stat-value">{formatCurrency(revenue)}</div></div>
        <div className="stat-card"><div className="stat-label">Hóa đơn</div><div className="stat-value">{invoices.length}</div></div>
        <div className="stat-card"><div className="stat-label">Mặt hàng quản lý</div><div className="stat-value">{products.length}</div></div>
      </div>

      <section className="card">
        <h2 className="h2">Bộ lọc báo cáo</h2>
        <div className="form-grid" style={{ marginTop: 14 }}>
          <div><label>Từ ngày</label><input className="input" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></div>
          <div><label>Đến ngày</label><input className="input" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></div>
          <div><label>Loại báo cáo</label><select className="input" value={reportType} onChange={(e) => setReportType(e.target.value)}><option>Doanh thu</option><option>Sản phẩm bán chạy</option><option>Tồn kho</option></select></div>
        </div>
      </section>

      <section className="card">
        <h2 className="h2">Kết quả từ {fromDate} đến {toDate}</h2>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>STT</th><th>{reportType === 'Doanh thu' ? 'Ngày' : 'Sản phẩm'}</th><th>Ghi chú</th><th>{reportType === 'Doanh thu' ? 'Giá trị' : 'Số lượng'}</th></tr></thead>
            <tbody>
              {rows.map((item, index) => (
                <tr key={`${item.note}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.label}</td>
                  <td>{item.note}</td>
                  <td>{reportType === 'Doanh thu' ? formatCurrency(item.value) : item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BaoCaoThongKe;
