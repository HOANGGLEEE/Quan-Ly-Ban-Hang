import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../data/mockData';
import { api } from '../services/api';

const seedDebts = [
  { id: 'CN001', customer: 'Công ty An Phát', phone: '0283999888', invoices: 1, total: 41970000, paid: 20000000 },
  { id: 'CN002', customer: 'Nguyễn Văn Bình', phone: '0911002200', invoices: 2, total: 28500000, paid: 12000000 },
];

const QuanLyCongNo = () => {
  const [debts, setDebts] = useState(seedDebts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([api.sales.invoices(), api.sales.customers()])
      .then(([invoiceData, customerData]) => {
        if (!Array.isArray(invoiceData) || !Array.isArray(customerData)) return;
        const customersById = Object.fromEntries(customerData.map((item) => [item.id, item]));
        const grouped = invoiceData.map((invoice) => {
          const customer = customersById[invoice.customerId] || {};
          const total = Number(invoice.subtotal || invoice.TONGTIENHANG || 0);
          const paid = Number(invoice.paid || invoice.DATHANHTOAN || 0);
          return {
            id: invoice.id,
            customer: customer.name || invoice.customerId || 'Khách hàng',
            phone: customer.phone || '',
            invoices: 1,
            total,
            paid,
          };
        });
        if (grouped.length) setDebts(grouped);
      })
      .catch(() => {});
  }, []);
  const filteredDebts = debts.filter((item) => item.customer.toLowerCase().includes(search.toLowerCase()) || item.phone.includes(search));

  const markPaid = async (id) => {
    const item = debts.find((debt) => debt.id === id);
    if (!item) return;
    const remain = item.total - item.paid;
    if (remain <= 0) return;
    await api.sales.createPayment({
      id: `TT${Date.now().toString().slice(-5)}`,
      invoiceId: id,
      method: 'Tiền mặt',
      amount: remain,
      status: 'Đã thanh toán',
    });
    setDebts((current) => current.map((debt) => (debt.id === id ? { ...debt, paid: debt.total } : debt)));
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="breadcrumbs">Kế toán / Công nợ</p>
          <h1 className="h1">Quản lý công nợ khách hàng</h1>
        </div>
      </header>

      <section className="card">
        <div className="toolbar">
          <h2 className="h2">Khách hàng còn nợ</h2>
          <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm tên hoặc số điện thoại..." style={{ maxWidth: 360 }} />
        </div>
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead><tr><th>Khách hàng</th><th>Số điện thoại</th><th>Số hóa đơn</th><th>Tổng nợ</th><th>Đã trả</th><th>Còn nợ</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>
              {filteredDebts.map((item) => {
                const remain = item.total - item.paid;
                return (
                  <tr key={item.id}>
                    <td>{item.customer}</td>
                    <td>{item.phone}</td>
                    <td>{item.invoices}</td>
                    <td>{formatCurrency(item.total)}</td>
                    <td>{formatCurrency(item.paid)}</td>
                    <td>{formatCurrency(remain)}</td>
                    <td><span className={`badge ${remain === 0 ? 'success' : 'danger'}`}>{remain === 0 ? 'Đã tất toán' : 'Còn nợ'}</span></td>
                    <td><button className="btn secondary" disabled={remain === 0} onClick={() => markPaid(item.id)}>Ghi nhận trả</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default QuanLyCongNo;
