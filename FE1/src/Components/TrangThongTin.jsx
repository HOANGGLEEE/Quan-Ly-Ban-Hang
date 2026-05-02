import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/style.css';
import '../style/info-page.css';
import DauTrangDienMay from './DauTrangDienMay';
import { getCartCount } from '../utils/cart';

const pageContent = {
  about: {
    label: 'Về cửa hàng',
    title: 'Giới thiệu Điện máy Xanh',
    description: 'Không gian mua sắm điện máy được tổ chức rõ ràng, dễ tìm sản phẩm và dùng chung một giỏ hàng trên toàn website.',
    icon: 'fa-circle-info',
    panels: [
      ['Sản phẩm rõ nhóm', 'Tivi, tủ lạnh, máy giặt, điều hòa và đồ gia dụng được tách theo nhu cầu để khách chọn nhanh hơn.'],
      ['Giỏ hàng thống nhất', 'Thêm sản phẩm từ mọi danh mục và quản lý tại một trang giỏ hàng duy nhất.'],
      ['Giao diện đồng bộ', 'Màu sắc, nút bấm và khoảng cách được chuẩn hóa theo cùng một hệ thiết kế.'],
    ],
  },
  orders: {
    label: 'Tài khoản',
    title: 'Lịch sử đơn hàng',
    description: 'Theo dõi các đơn hàng demo, trạng thái xử lý và tổng tiền ngay trong một màn hình.',
    icon: 'fa-clock-rotate-left',
    panels: [
      ['DH-2401', 'Đã tiếp nhận - 1 Smart TV Samsung - 24.990.000đ'],
      ['DH-2402', 'Đang giao - Tủ lạnh Samsung Inverter - 7.990.000đ'],
      ['DH-2403', 'Hoàn tất - Nồi chiên không dầu Panasonic - 2.690.000đ'],
    ],
  },
  topup: {
    label: 'Dịch vụ',
    title: 'Thẻ nạp ngay',
    description: 'Khu vực nạp thẻ demo với bố cục gọn, dễ chọn mệnh giá và kiểm tra ưu đãi.',
    icon: 'fa-bolt',
    panels: [
      ['50.000đ', 'Phù hợp nạp nhanh cho tài khoản phụ.'],
      ['100.000đ', 'Lựa chọn phổ biến, xử lý nhanh trong demo.'],
      ['200.000đ', 'Có nhãn ưu đãi nổi bật để người dùng dễ nhận biết.'],
    ],
  },
  news: {
    label: 'Tin tức',
    title: '24h Công Nghệ',
    description: 'Tin nhanh về tivi, tủ lạnh, máy giặt, điều hòa và kinh nghiệm chọn mua điện máy.',
    icon: 'fa-newspaper',
    panels: [
      ['Cách chọn tivi phòng khách', 'Ưu tiên kích thước, độ phân giải và hệ điều hành phù hợp nhu cầu.'],
      ['Tủ lạnh nên chọn dung tích nào?', 'Dựa trên số thành viên, thói quen trữ thực phẩm và mức tiết kiệm điện.'],
      ['Gia dụng đáng mua', 'Nồi chiên, lò vi sóng và bếp từ giúp việc bếp núc nhanh gọn hơn.'],
    ],
  },
};

const TrangThongTin = ({ type }) => {
  const content = pageContent[type] || pageContent.about;
  const [cartCount, setCartCount] = useState(() => getCartCount());

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  return (
    <>
      <DauTrangDienMay cartCount={cartCount} />
      <main className="info-page">
        <section className="info-hero">
          <div className="info-hero-copy">
            <span>{content.label}</span>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <div className="info-actions">
              <Link to="/products">Xem sản phẩm</Link>
              <Link to="/cart">Mở giỏ hàng</Link>
            </div>
          </div>
          <div className="info-hero-visual" aria-hidden="true">
            <i className={`fa-solid ${content.icon}`}></i>
          </div>
        </section>
        <section className="info-grid">
          {content.panels.map(([title, text]) => (
            <article className="info-card" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default TrangThongTin;
