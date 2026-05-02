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

const Sidebar = ({ currentView, setView, user, onLogout }) => {
  const menuItems = [
    { id: 'san-pham', label: 'Sản phẩm điện máy', icon: Package },
    { id: 'danh-muc', label: 'Danh mục', icon: ClipboardList },
    { id: 'ban-hang', label: 'Bán hàng', icon: ReceiptText },
    { id: 'doi-tra', label: 'Đổi trả', icon: Repeat2 },
    { id: 'nhap-kho', label: 'Nhập kho', icon: PackagePlus },
    { id: 'ton-kho', label: 'Tồn kho', icon: Boxes },
    { id: 'khuyen-mai', label: 'Khuyến mãi', icon: BadgePercent },
    { id: 'cong-no', label: 'Công nợ khách hàng', icon: HandCoins },
    { id: 'thong-ke', label: 'Báo cáo thống kê', icon: BarChart3 },
    { id: 'nhan-vien', label: 'Nhân viên', icon: Users },
    { id: 'tai-khoan', label: 'Tài khoản', icon: ShieldCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">DM</div>
        <div>
          Điện máy HL
          <span className="brand-subtitle">Quản lý bán hàng</span>
        </div>
      </div>
      <nav className="nav">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
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
        <a href="#!" onClick={(e) => e.preventDefault()}><FileText className="menu-icon" /> {user?.username || 'Phiên làm việc'}</a>
        <button className="sidebar-logout" type="button" onClick={onLogout}>Đăng xuất</button>
      </div>
    </aside>
  );
};

export default Sidebar;
