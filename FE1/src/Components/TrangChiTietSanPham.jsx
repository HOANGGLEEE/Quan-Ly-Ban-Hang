import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/style.css';
import '../style/chitiet_sp.css';
import { storeProducts } from '../data/products';
import { addToCart, getCartCount } from '../utils/cart';
import DauTrangDienMay from './DauTrangDienMay';

const detailByGroup = {
  tivi: {
    route: '/tivi',
    routeLabel: 'Xem thêm tivi',
    specs: [
      ['Kích thước hiển thị', 'Theo model sản phẩm'],
      ['Độ phân giải', 'Full HD / 4K tùy phiên bản'],
      ['Tính năng thông minh', 'Ứng dụng giải trí, kết nối Wi-Fi'],
      ['Bảo hành', 'Chính hãng 24 tháng'],
    ],
    highlights: [
      'Hình ảnh sắc nét, màu sắc tối ưu cho phim ảnh và thể thao.',
      'Hỗ trợ các nền tảng giải trí phổ biến, thao tác dễ dùng cho gia đình.',
      'Thiết kế viền mỏng, phù hợp phòng khách, phòng ngủ hoặc văn phòng.',
    ],
  },
  'may-giat': {
    route: '/may-giat',
    routeLabel: 'Xem thêm máy giặt',
    specs: [
      ['Khối lượng giặt', 'Theo model sản phẩm'],
      ['Kiểu máy', 'Cửa trước / cửa trên / giặt sấy'],
      ['Công nghệ', 'Inverter, giặt nhanh, chăm sóc vải'],
      ['Bảo hành', 'Chính hãng theo tiêu chuẩn nhà sản xuất'],
    ],
    highlights: [
      'Vận hành ổn định, tối ưu điện nước cho nhu cầu giặt hằng ngày.',
      'Nhiều chế độ giặt cho quần áo trẻ em, đồ cotton và đồ dày.',
      'Phù hợp gia đình nhỏ đến gia đình đông người tùy dung tích.',
    ],
  },
  'dieu-hoa': {
    route: '/dieu-hoa',
    routeLabel: 'Xem thêm điều hòa',
    specs: [
      ['Công suất', 'Theo model sản phẩm'],
      ['Công nghệ tiết kiệm điện', 'Inverter trên các dòng hỗ trợ'],
      ['Tiện ích', 'Làm lạnh nhanh, hẹn giờ, lọc bụi cơ bản'],
      ['Dịch vụ', 'Hỗ trợ giao hàng và lắp đặt theo khu vực'],
    ],
    highlights: [
      'Làm lạnh nhanh, phù hợp phòng ngủ, phòng khách hoặc phòng làm việc.',
      'Thiết kế gọn, dễ phối với nhiều không gian nội thất.',
      'Tối ưu chi phí sử dụng dài hạn với các dòng inverter.',
    ],
  },
  'noi-com-dien': {
    route: '/do-gia-dung',
    routeLabel: 'Xem thêm nồi cơm điện',
    specs: [
      ['Dung tích', 'Theo model sản phẩm'],
      ['Kiểu nồi', 'Nắp gài / điện tử / áp suất tùy phiên bản'],
      ['Lòng nồi', 'Chống dính, dễ vệ sinh'],
      ['Phù hợp', 'Bữa ăn gia đình hằng ngày'],
    ],
    highlights: [
      'Nấu cơm ổn định, giữ ấm tiện lợi sau khi chín.',
      'Thao tác đơn giản, dễ dùng cho mọi thành viên trong gia đình.',
      'Thiết kế gọn, dễ đặt trong khu bếp hoặc kệ gia dụng.',
    ],
  },
  'am-sieu-toc': {
    route: '/do-gia-dung',
    routeLabel: 'Xem thêm ấm siêu tốc',
    specs: [
      ['Dung tích', 'Theo model sản phẩm'],
      ['Chất liệu', 'Inox / nhựa chịu nhiệt tùy phiên bản'],
      ['An toàn', 'Tự ngắt khi nước sôi'],
      ['Nhu cầu', 'Pha trà, cà phê, mì và đồ uống nóng'],
    ],
    highlights: [
      'Đun nước nhanh, tiết kiệm thời gian cho sinh hoạt hằng ngày.',
      'Tay cầm chắc chắn, dễ rót và vệ sinh.',
      'Kích thước nhỏ gọn, phù hợp nhà bếp, phòng làm việc hoặc phòng trọ.',
    ],
  },
};

const formatCategory = (value = '') => value.toLowerCase();

const TrangChiTietSanPham = () => {
  const { id } = useParams();
  const [cartCount, setCartCount] = useState(() => getCartCount());

  const product = useMemo(() => {
    const code = decodeURIComponent(id || '');
    return storeProducts.find((item) => item.code === code) || storeProducts[0];
  }, [id]);

  const detail = detailByGroup[product.group] || {
    route: '/products',
    routeLabel: 'Xem thêm sản phẩm',
    specs: [
      ['Danh mục', product.category],
      ['Mã sản phẩm', product.code],
      ['Tình trạng', 'Hàng chính hãng'],
      ['Bảo hành', 'Theo chính sách cửa hàng'],
    ],
    highlights: [
      'Sản phẩm phù hợp nhu cầu sử dụng điện máy gia đình.',
      'Có thể thêm vào giỏ hàng và đặt mua trực tuyến.',
      'Hỗ trợ giao hàng theo khu vực.',
    ],
  };

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const handleAddCart = () => {
    addToCart(product);
    setCartCount(getCartCount());
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  return (
    <>
      <DauTrangDienMay cartCount={cartCount} />
      <main className="chitietSanpham">
        <div className="product-detail-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to={detail.route}>{product.category}</Link>
          <span>/</span>
          <strong>{product.name}</strong>
        </div>
        <div className="rowdetail product-detail-panel">
          <section className="picture">
            <img src={product.image} alt={product.name} />
          </section>
          <section className="price_sale">
            <span className="home-product-badge">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="home-product-code">Mã sản phẩm: {product.code}</p>
            <div className="area_price">
              <del>{product.oldPrice}<sup>đ</sup></del>
              <strong>{product.price}<sup>đ</sup></strong>
            </div>
            <div className="detail-status-row">
              <span><i className="fa-solid fa-circle-check"></i> Còn hàng</span>
              <span><i className="fa-solid fa-award"></i> Hàng chính hãng</span>
              <span><i className="fa-solid fa-recycle"></i> Hỗ trợ đổi trả</span>
            </div>
            <div className="area_promo">
              <div className="promo">
                <i className="fa-solid fa-gift"></i>
                <span>{product.gift}</span>
              </div>
              <div className="promo">
                <i className="fa-solid fa-truck-fast"></i>
                <span>Giao hàng và lắp đặt theo khu vực</span>
              </div>
              <div className="promo">
                <i className="fa-solid fa-shield-halved"></i>
                <span>Bảo hành chính hãng, hỗ trợ đổi trả theo chính sách cửa hàng</span>
              </div>
            </div>
            <div className="pay-actions">
              <button type="button" className="btn-confirm" onClick={handleAddCart}>
                <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ
              </button>
              <Link to={detail.route} className="btn-back">{detail.routeLabel}</Link>
            </div>
          </section>
        </div>
        <div className="product-detail-content">
          <section className="info_product detail-card">
            <h2>Thông tin sản phẩm</h2>
            <p>
              {product.name} thuộc nhóm {formatCategory(product.category)}, phù hợp cho nhu cầu mua sắm điện máy gia đình.
              Sản phẩm có giá bán hiện tại {product.price}đ, ưu đãi kèm theo: {product.gift}.
            </p>
            <ul className="info detail-highlight-list">
              {detail.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="detail-card">
            <h2>Thông số nổi bật</h2>
            <div className="detail-spec-table">
              {detail.specs.map(([label, value]) => (
                <div className="detail-spec-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
              <div className="detail-spec-row">
                <span>Giá niêm yết</span>
                <strong>{product.oldPrice}đ</strong>
              </div>
              <div className="detail-spec-row">
                <span>Giá bán</span>
                <strong>{product.price}đ</strong>
              </div>
            </div>
          </section>
          <section className="detail-card">
            <h2>Dịch vụ đi kèm</h2>
            <div className="detail-service-grid">
              <div>
                <i className="fa-solid fa-truck-fast"></i>
                <strong>Giao hàng tận nơi</strong>
                <span>Thời gian giao tùy khu vực và tình trạng kho.</span>
              </div>
              <div>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <strong>Hỗ trợ lắp đặt</strong>
                <span>Áp dụng với tivi, máy giặt và điều hòa theo chính sách cửa hàng.</span>
              </div>
              <div>
                <i className="fa-solid fa-shield-halved"></i>
                <strong>Bảo hành chính hãng</strong>
                <span>Thông tin bảo hành được xác nhận khi đặt mua.</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default TrangChiTietSanPham;
