import React from 'react';
import Sidebar from './Components/Sidebar';
import QuanLyBanHang from './Components/QuanLyBanHang';
import BaoCaoThongKe from './Components/BaoCaoThongKe';
import QuanLyTaiKhoan from './Components/QuanLyTaiKhoan';
import XuLyDoiTra from './Components/XuLyDoiTra';
import QuanLyTonKho from './Components/QuanLyTonKho';
import QuanLyNhanVien from './Components/QuanLyNhanVien';
import QuanLyKhuyenMai from './Components/QuanLyKhuyenMai';
import QuanLyDanhMuc from './Components/QuanLyDanhMuc';
import QuanLySanPham from './Components/QuanLySanPham';
import QuanLyNhapKho from './Components/QuanLyNhapKho';
import QuanLyCongNo from './Components/QuanLyCongNo';
import QuanLyDonOnline from './Components/QuanLyDonOnline';
import QuanLyBaoHanh from './Components/QuanLyBaoHanh';
import Login from './Components/Login';
import { useAppStore } from './store/AppStoreCore';

const App = () => {
  const { state, setView, login, logout } = useAppStore();
  const { user, currentView } = state;

  const handleLogout = () => {
    logout();
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'ban-hang': return <QuanLyBanHang />;
      case 'don-online': return <QuanLyDonOnline />;
      case 'thong-ke': return <BaoCaoThongKe />;
      case 'tai-khoan': return <QuanLyTaiKhoan />;
      case 'cong-no': return <QuanLyCongNo />;
      case 'doi-tra': return <XuLyDoiTra />;
      case 'bao-hanh': return <QuanLyBaoHanh />;
      case 'ton-kho': return <QuanLyTonKho />;
      case 'nhan-vien': return <QuanLyNhanVien />;
      case 'khuyen-mai': return <QuanLyKhuyenMai />;
      case 'danh-muc': return <QuanLyDanhMuc />;
      case 'san-pham': return <QuanLySanPham />;
      case 'nhap-kho': return <QuanLyNhapKho />;
      default: return <QuanLyBanHang />;
    }
  };

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="app-shell">
      <Sidebar currentView={currentView} setView={setView} user={user} onLogout={handleLogout} />
      <main className="main">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default App;
