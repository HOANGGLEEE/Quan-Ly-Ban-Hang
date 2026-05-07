import React from 'react';
import {
  BadgePercent,
  BarChart3,
  Boxes,
  ClipboardList,
  FileText,
  HandCoins,
  Headphones,
  Package,
  PackagePlus,
  ReceiptText,
  Repeat2,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useAppStore } from '../store/AppStoreCore';

const Sidebar = ({ currentView, setView, user, onLogout }) => {
  const { visibleMenuItems } = useAppStore();
  const icons = {
    'san-pham': Package,
    'danh-muc': ClipboardList,
    'ban-hang': ReceiptText,
    'don-online': FileText,
    'doi-tra': Repeat2,
    'bao-hanh': Headphones,
    'nhap-kho': PackagePlus,
    'ton-kho': Boxes,
    'khuyen-mai': BadgePercent,
    'cong-no': HandCoins,
    'thong-ke': BarChart3,
    'nhan-vien': Users,
    'tai-khoan': ShieldCheck,
  };

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
        {visibleMenuItems.map((item) => {
          const Icon = icons[item.id] || FileText;
          return (
          <a
            key={item.id}
            href="#!"
            className={currentView === item.id ? 'active' : ''}
            aria-current={currentView === item.id ? 'page' : undefined}
            onClick={(e) => { e.preventDefault(); setView(item.id); }}
          >
            <Icon className="menu-icon" />
            {item.label}
          </a>
          );
        })}
      </nav>
      <div className="logout">
        <a href="#!" onClick={(e) => e.preventDefault()}><FileText className="menu-icon" /> {user?.username || 'Phiên làm việc'}</a>
        <button className="sidebar-logout" type="button" onClick={onLogout}>Đăng xuất</button>
      </div>
    </aside>
  );
};

export default Sidebar;
