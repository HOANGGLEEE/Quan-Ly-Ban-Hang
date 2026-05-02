import React from 'react';
import {
  BadgePercent,
  BarChart3,
  Boxes,
  ClipboardList,
  FileText,
  HandCoins,
  Package,
  PackagePlus,
  ReceiptText,
  Repeat2,
  ShieldCheck,
  Users,
} from 'lucide-react';

const Sidebar = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'ban-hang', label: 'Bán hàng', section: 'THU NGÂN', icon: ReceiptText },
    { id: 'doi-tra', label: 'Đổi trả', section: 'THU NGÂN', icon: Repeat2 },
    { id: 'thong-ke', label: 'Báo cáo thống kê', section: 'KẾ TOÁN', icon: BarChart3 },
    { id: 'cong-no', label: 'Công nợ khách hàng', section: 'KẾ TOÁN', icon: HandCoins },
    { id: 'san-pham', label: 'Sản phẩm điện máy', section: 'KHO HÀNG', icon: Package },
    { id: 'danh-muc', label: 'Danh mục', section: 'KHO HÀNG', icon: ClipboardList },
    { id: 'nhap-kho', label: 'Nhập kho', section: 'KHO HÀNG', icon: PackagePlus },
    { id: 'ton-kho', label: 'Tồn kho', section: 'KHO HÀNG', icon: Boxes },
    { id: 'khuyen-mai', label: 'Khuyến mãi', section: 'QUẢN TRỊ', icon: BadgePercent },
    { id: 'nhan-vien', label: 'Nhân viên', section: 'QUẢN TRỊ', icon: Users },
    { id: 'tai-khoan', label: 'Tài khoản', section: 'QUẢN TRỊ', icon: ShieldCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">DM</div>
        <div>
          Điện Máy Store
          <span className="brand-subtitle">Quản lý bán hàng</span>
        </div>
      </div>
      <nav className="nav">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {(index === 0 || menuItems[index - 1].section !== item.section) && (
              <div className="section-title">{item.section}</div>
            )}
            <a 
              href="#!" 
              className={currentView === item.id ? 'active' : ''} 
              aria-current={currentView === item.id ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); setView(item.id); }}
            >
              <item.icon className="menu-icon" />
              {item.label}
            </a>
          </React.Fragment>
        ))}
      </nav>
      <div className="logout">
        <a href="#!"><FileText className="menu-icon" /> Phiên làm việc</a>
      </div>
    </aside>
  );
};

export default Sidebar;
