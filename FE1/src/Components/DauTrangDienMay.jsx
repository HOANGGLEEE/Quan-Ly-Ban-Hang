import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DauTrangDienMay = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = searchText.trim();

    if (!keyword) {
      toast.info('Nhập tên sản phẩm bạn muốn tìm.');
      return;
    }

    navigate(`/products?search=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <header>
        <img style={{ width: '964.8px' }} src="/AnhDau.PNG" alt="" />
      </header>
      <nav>
        <div className="container">
          <ul className="site-nav">
            <li className="nav-brand">
              <Link to="/"><img style={{ width: '150px' }} src="/logo.PNG" alt="Logo" /></Link>
            </li>
            <li className="nav-location">
              <button type="button" onClick={() => setShowAddress(true)}>
                Xem giá, tồn kho tại:<br />Hồ Chí Minh<i className="fa-solid fa-sort-down"></i>
              </button>
            </li>
            <li className="nav-search">
              <form className="home-search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Bạn Muốn Tìm Gì"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <button type="submit" aria-label="Tìm kiếm"><i className="fa-solid fa-magnifying-glass"></i></button>
              </form>
            </li>
            <li><Link className="nav-pill" to="/about"><i className="fa-solid fa-circle-info"></i>Giới thiệu</Link></li>
            <li><Link className="nav-pill" to="/tech-news"><i className="fa-solid fa-newspaper"></i>24h Công Nghệ</Link></li>
            <li><Link className="nav-pill" to="/order-history"><i className="fa-solid fa-clock-rotate-left"></i>Lịch sử đơn hàng</Link></li>
            <li><Link className="nav-pill nav-topup-button" to="/topup"><span className="btn-containt"><span className="btn-top"></span></span>Thẻ nạp ngay</Link></li>
            <li><button type="button" className="nav-cart-button" onClick={() => navigate('/cart')}><i className="fa-solid fa-cart-shopping"></i>Giỏ hàng ({cartCount})</button></li>
            <li><Link className="nav-auth-link" to="/register">Đăng kí</Link></li>
            <li><Link className="nav-auth-link primary" to="/login">Đăng nhập</Link></li>

            <div className={`adres-form ${showAddress ? 'show' : ''}`}>
              <div className="adress-form-content">
                <h2>Chọn địa chỉ nhận hàng<span id="adress-close" onClick={() => setShowAddress(false)}>X Đóng</span> </h2>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  setShowAddress(false);
                  toast.success('Đã cập nhật khu vực giao hàng.');
                }}>
                  <p>Chọn đầy đủ địa chỉ nhận hàng để biết chính xác thời gian giao</p>
                  <select name="">
                    <option value="#">--Chọn địa điểm </option>
                    <option value="#">--Đà Nẵng </option>
                  </select>
                  <select name="">
                    <option value="#">--Chọn Quận\Huyện </option>
                    <option value="#">--TP.HCM </option>
                  </select>
                  <select name="">
                    <option value="#">--Chọn Phường\Xã </option>
                    <option value="#">--Đà Nẵng </option>
                  </select>
                  <input type="text" placeholder="Số nhà ,Tên đường" />
                  <button style={{ backgroundColor: '#F97E0E', borderRadius: '5px', marginTop: '20px', height: '40px', width: '80%', cursor: 'pointer', outline: 'none', border: 'none' }}>Xác Nhận</button>
                </form>
              </div>
            </div>
          </ul>
        </div>
      </nav>
      <section className="menu-bar">
        <div className="container">
          <div className="menu-bar-content">
            <ul>
              <li><Link to="/tivi"><i className="fa-solid fa-tv"></i> TIVI</Link></li>
              <li><Link to="/may-giat"><i className="fa-solid fa-soap"></i> MÁY GIẶT</Link></li>
              <li><Link to="/dien-may-khuyen-mai"><i className="fa-solid fa-tags"></i> ĐIỆN MÁY KHUYẾN MÃI</Link></li>
              <li><Link to="/dieu-hoa"><i className="fa-solid fa-wind"></i> ĐIỀU HÒA</Link></li>
              <li><Link to="/do-gia-dung"><i className="fa-solid fa-kitchen-set"></i> NỒI CƠM - ẤM SIÊU TỐC<i style={{ marginLeft: '6px' }} className="fa-solid fa-sort-down"></i> </Link></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default DauTrangDienMay;
