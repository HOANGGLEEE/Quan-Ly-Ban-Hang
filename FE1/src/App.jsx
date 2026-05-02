import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import TrangChuDienMay from './Components/TrangChuDienMay';
import DangNhap from './Components/DangNhap';
import DangKy from './Components/DangKy';
import QuenMatKhau from './Components/QuenMatKhau';
import TrangChiTietSanPham from './Components/TrangChiTietSanPham';
import TrangGioHang from './Components/TrangGioHang';
import TrangDanhMucSanPham from './Components/TrangDanhMucSanPham';
import TrangThongTin from './Components/TrangThongTin';

const normalizeLabel = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  useEffect(() => {
    const legacyRoutes = new Map([
      ['trangchu.html', '/'],
      ['dangki.html', '/register'],
      ['dangnhap.html', '/login'],
      ['sản phẩm.html', '/products'],
      ['san pham.html', '/products'],
      ['tivi.html', '/tivi'],
      ['tu lanh.html', '/may-giat'],
      ['tủ lạnh.html', '/may-giat'],
      ['may giat.html', '/may-giat'],
      ['máy giặt.html', '/may-giat'],
      ['dieu hoa.html', '/dieu-hoa'],
      ['điều hòa.html', '/dieu-hoa'],
      ['do gia dung.html', '/do-gia-dung'],
      ['đồ gia dụng.html', '/do-gia-dung'],
      ['may cu gia re.html', '/dien-may-khuyen-mai'],
      ['máy cũ giá rẻ.html', '/dien-may-khuyen-mai'],
      ['phu kien.html', '/accessories'],
      ['phụ kiện.html', '/accessories'],
      ['chi tiết sản phẩm.html', '/product-detail/1'],
      ['chi tiet san pham.html', '/product-detail/1'],
      ['gio hang.html', '/cart'],
      ['giỏ hàng.html', '/cart'],
      ['cart.html', '/cart'],
      ['lich su don hang.html', '/order-history'],
      ['lịch sử đơn hàng.html', '/order-history'],
      ['the nap.html', '/topup'],
      ['thẻ nạp.html', '/topup'],
      ['24h cong nghe.html', '/tech-news'],
      ['24h công nghệ.html', '/tech-news'],
      ['gioi thieu.html', '/about'],
      ['giới thiệu.html', '/about'],
    ]);

    const handleLegacyLink = (event) => {
      const clickedButton = event.target.closest('button');
      const buttonLabel = normalizeLabel(clickedButton?.textContent);
      if (buttonLabel?.startsWith('gio hang')) {
        event.preventDefault();
        navigate('/cart');
        return;
      }

      const link = event.target.closest('a');
      if (!link) return;

      const rawHref = link.getAttribute('href')?.trim();
      const labelRoutes = new Map([
        ['tivi', '/tivi'],
        ['tu lanh may giat', '/may-giat'],
        ['may giat', '/may-giat'],
        ['dien may khuyen mai', '/dien-may-khuyen-mai'],
        ['dieu hoa gia dung', '/dieu-hoa'],
        ['dieu hoa', '/dieu-hoa'],
        ['do gia dung', '/do-gia-dung'],
        ['may cu gia re', '/dien-may-khuyen-mai'],
        ['man hinh may tinh', '/dieu-hoa'],
        ['phu kien', '/do-gia-dung'],
        ['gio hang', '/cart'],
        ['gio hang cua ban (0) san pham', '/cart'],
        ['lich su don hang', '/order-history'],
        ['the nap ngay', '/topup'],
        ['24h cong nghe', '/tech-news'],
        ['gioi thieu', '/about'],
      ]);
      const labelRoute = labelRoutes.get(normalizeLabel(link.textContent));

      if (!rawHref || rawHref === '#') {
        event.preventDefault();
        if (labelRoute) {
          navigate(labelRoute);
        }
        return;
      }

      const route = legacyRoutes.get(
        decodeURIComponent(rawHref).replace(/^\.?\//, '').trim().toLowerCase(),
      );

      if (route) {
        event.preventDefault();
        navigate(route);
      } else if (labelRoute) {
        event.preventDefault();
        navigate(labelRoute);
      }
    };

    document.addEventListener('click', handleLegacyLink);
    return () => document.removeEventListener('click', handleLegacyLink);
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TrangChuDienMay />} />
        <Route
          path="/login"
          element={<DangNhap onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/register" element={<DangKy />} />
        <Route path="/forgot-password" element={<QuenMatKhau />} />
        <Route path="/products" element={<Navigate to="/dieu-hoa" replace />} />
        <Route path="/product-detail/:id" element={<TrangChiTietSanPham />} />
        <Route path="/headphones" element={<Navigate to="/do-gia-dung" replace />} />
        <Route path="/keyboard" element={<Navigate to="/do-gia-dung" replace />} />
        <Route path="/mouse" element={<Navigate to="/do-gia-dung" replace />} />
        <Route path="/tivi" element={<TrangDanhMucSanPham type="tivi" />} />
        <Route path="/may-giat" element={<TrangDanhMucSanPham type="refrigeratorWasher" />} />
        <Route path="/tu-lanh-may-giat" element={<Navigate to="/may-giat" replace />} />
        <Route path="/dien-may-khuyen-mai" element={<TrangDanhMucSanPham type="used" />} />
        <Route path="/dieu-hoa" element={<TrangDanhMucSanPham type="monitors" />} />
        <Route path="/dieu-hoa-gia-dung" element={<Navigate to="/dieu-hoa" replace />} />
        <Route path="/do-gia-dung" element={<TrangDanhMucSanPham type="accessories" />} />
        <Route path="/used-products" element={<Navigate to="/dien-may-khuyen-mai" replace />} />
        <Route path="/accessories" element={<Navigate to="/do-gia-dung" replace />} />
        <Route path="/about" element={<TrangThongTin type="about" />} />
        <Route path="/order-history" element={<TrangThongTin type="orders" />} />
        <Route path="/topup" element={<TrangThongTin type="topup" />} />
        <Route path="/tech-news" element={<TrangThongTin type="news" />} />
        <Route path="/cart" element={<TrangGioHang />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <TrangChuDienMay /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
