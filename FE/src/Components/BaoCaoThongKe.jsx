import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { formatCurrency, invoices as seedInvoices, products as seedProducts } from '../data/mockData';
import { api } from '../services/api';
import { notifyError } from '../utils/notifications';

const BaoCaoThongKe = () => {
  const [products, setProducts] = useState(seedProducts);
  const [invoices, setInvoices] = useState(seedInvoices);
  const [fromDate, setFromDate] = useState('2026-04-01');
  const [toDate, setToDate] = useState('2026-04-30');
  const [reportType, setReportType] = useState('Doanh thu');
  const [rows, setRows] = useState([]);

  const loadSummary = async () => {
    try {
      const [productData, invoiceData] = await Promise.all([api.products.list(), api.sales.invoices()]);
        if (Array.isArray(productData)) setProducts(productData);
        if (Array.isArray(invoiceData)) setInvoices(invoiceData.map((item) => ({ ...item, date: item.date?.slice?.(0, 10) || item.date, items: item.items || [] })));
    } catch (error) {
      notifyError(error, 'Không thể tải dữ liệu báo cáo');
    }
  };

  const loadReport = useCallback(async () => {
    try {
      const params = { fromDate, toDate };
      let data = [];
      if (reportType === 'Doanh thu') data = await api.reports.revenue(params);
      else if (reportType === 'Sản phẩm bán chạy') data = await api.reports.bestSelling(params);
      else data = await api.reports.inventory();
      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      notifyError(error, 'Không thể tải kết quả báo cáo');
      setRows([]);
    }
  }, [fromDate, toDate, reportType]);

  useEffect(() => {
    void Promise.resolve().then(loadSummary);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadReport);
  }, [loadReport]);

  const revenue = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0),
    [invoices],
  );

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
                  <td>{String(item.label || '').slice(0, 10)}</td>
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
