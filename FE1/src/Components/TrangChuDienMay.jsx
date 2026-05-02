import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/style.css';
import { accessoryProducts, featuredProducts, monitorProducts } from '../data/products';
import { addToCart, getCartCount } from '../utils/cart';
import DauTrangDienMay from './DauTrangDienMay';

const ProductSection = ({ title, products, onAddCart }) => (
    <section className="home-product-section">
        <div className="container">
            <div className="home-product-heading">
                <h2>{title}</h2>
                <Link to="/dieu-hoa">Xem tất cả</Link>
            </div>
            <div className="home-product-grid">
                {products.map((product) => (
                    <article className="home-product-card" key={product.code}>
                        <span className="home-product-badge">{product.category}</span>
                        <img src={product.image} alt={product.name} />
                        <Link to={`/product-detail/${encodeURIComponent(product.code)}`}><strong>{product.name}</strong></Link>
                        <span className="home-product-code">Mã: {product.code}</span>
                        <span className="home-product-old">{product.oldPrice}<sup>đ</sup></span>
                        <span className="home-product-price">{product.price}<sup>đ</sup></span>
                        <span className="home-product-gift">{product.gift}</span>
                        <button type="button" className="home-add-cart" onClick={() => onAddCart(product)}>
                            <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

const TrangChuDienMay = () => {
    const [cartCount, setCartCount] = useState(() => getCartCount());
    const [slideIndex, setSlideIndex] = useState(0);
    const slides = useMemo(() => [
        '/products/tivi-01-smart-tivi-qled-samsung-4k-55-inch-qa55q65d.jpg',
        '/products/may-giat-01-may-giat-aqua-11-kg-aqw-fr110jt-bk.jpg',
        '/products/dieu-hoa-01-may-lanh-nagakawa-inverter-1-hp-nis-c09r2t62.jpg',
        '/products/noi-com-dien-01-noi-com-dien-tu-sharp-1-8-lit-ks-com194ev-rd.png',
        '/products/am-sieu-toc-01-binh-dun-sieu-toc-rapido-1-8-lit-rk1815-2s.jpg',
    ], []);

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://kit.fontawesome.com/e80f60032e.js";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    useEffect(() => {
        const updateCartCount = () => setCartCount(getCartCount());
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, []);

    const handleAddCart = (product) => {
        addToCart(product);
        setCartCount(getCartCount());
        toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    };

    return (
      <>
    <DauTrangDienMay cartCount={cartCount} />
    <section className="slider">
        <div className="container">
            <div className="slider-content">
                <div className="silder-content-left">
                    <div className="silder-content-left-top-container">
                        <div className="silder-content-left-top">
                            {slides.map((slide, index) => (
                                <Link to="/products" key={slide}>
                                    <img
                                        src={slide}
                                        alt=""
                                        style={{ transform: `translateX(${(index - slideIndex) * 100}%)` }}
                                    />
                                </Link>
                            ))}
                        </div>
                        <div className="silder-content-left-top-btn">
                            <i className="fa-solid fa-chevron-left" onClick={() => setSlideIndex((slideIndex + slides.length - 1) % slides.length)}></i>
                            <i className="fa-solid fa-chevron-right" onClick={() => setSlideIndex((slideIndex + 1) % slides.length)}></i>
                        </div>
                    </div>
                    <div className="silder-content-left-bottom">
                        {['TIVI GIẢM SÂU', 'MÁY GIẶT BÁN CHẠY', 'ĐIỀU HÒA LẮP NHANH', 'NỒI CƠM ĐIỆN', 'ẤM SIÊU TỐC'].map((label, index) => (
                            <li key={label} className={slideIndex === index ? 'active' : ''} onClick={() => setSlideIndex(index)}>{label}</li>
                        ))}
                    </div>
                </div>
                <div className="silder-content-right">
                    <li><Link to="/tivi"><img src="/products/tivi-02-google-tivi-sony-4k-55-inch-k-55s25vm2.jpg" alt="" /></Link></li>
                    <li><Link to="/may-giat"><img src="/products/may-giat-02-may-giat-samsung-bespoke-ai-ecobubble-inverter-10-kg-ww10d.jpg" alt="" /></Link></li>
                    <li><Link to="/dieu-hoa"><img src="/products/dieu-hoa-02-may-lanh-midea-inverter-1-hp-mafa-09cdn8.jpg" alt="" /></Link></li>
                    <li><Link to="/do-gia-dung"><img src="/products/am-sieu-toc-02-binh-dun-sieu-toc-sunhouse-1-8-lit-shd1353.jpg" alt="" /></Link></li>
                </div>
    
            </div>
    
        </div>
    </section>
    <section className="banner-one">
        <div className="container">
            <img style={{height: "1px", width: "auto", textAlign: "center"}}src="/banner2.PNG" alt="" />
        </div>
    </section>
    <section className="slider-prodouct-one">
        <div className="container">
            <div className="slider-prodouct-one-content">
                <div className="slider-prodouct-one-content-title">
                    <h2>Săn Sale Online Mỗi Ngày</h2>
                </div>
                <div className="slider-prodouct-one-content-contaner">
                    <div className="slider-prodouct-one-content-items-content">
                        <div className="slider-prodouct-one-content-items">
                            <div className="slider-prodouct-one-content-item">
                                <img src="/products/tivi-02-google-tivi-sony-4k-55-inch-k-55s25vm2.jpg" alt="" />
                                <div className="slider-prodouct-one-content-item-text">
                                    <li><img src="/icon1-50x50.webp" alt="" /> <p> Trợ giá mùa dịch</p></li>
                                    <li>Tivi Casper QLED 55 inch</li>
                                    <li>Online giá rẻ </li>
                                    <li><a href="">18.990.000<sup>đ</sup></a><span>-18%</span></li>
                                    <li>15.490.000<sup>đ</sup></li>
                                    <li>Miễn phí lắp đặt</li>
                                    <li>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </li>
                                </div>
                                <li></li>
                            </div>
                            <div className="slider-prodouct-one-content-item">
                                <img src="/products/may-giat-02-may-giat-samsung-bespoke-ai-ecobubble-inverter-10-kg-ww10d.jpg" alt="" />
                                <div className="slider-prodouct-one-content-item-text">
                                    <li><img src="/icon1-50x50.webp" alt="" /> <p> Trợ giá mùa dịch</p></li>
                                    <li>Tủ lạnh Samsung Inverter 260 lít</li>
                                    <li>ƯU ĐÃI ĐIỆN MÁY </li>
                                    <li><a href="">9.990.000<sup>đ</sup></a><span>-20%</span></li>
                                    <li>7.990.000<sup>đ</sup></li>
                                    <li>Giao hàng miễn phí</li>
                                    <li>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </li>
                                </div>
                                <li></li>
                            </div>
                            <div className="slider-prodouct-one-content-item">
                                <img src="/products/dieu-hoa-02-may-lanh-midea-inverter-1-hp-mafa-09cdn8.jpg" alt="" />
                                <div className="slider-prodouct-one-content-item-text">
                                    <li><img src="/icon1-50x50.webp" alt="" /> <p> Trợ giá mùa dịch</p></li>
                                    <li>Máy giặt LG cửa trước 9 kg</li>
                                    <li>Online giá rẻ </li>
                                    <li><a href="">10.990.000<sup>đ</sup></a><span>-18%</span></li>
                                    <li>8.990.000<sup>đ</sup></li>
                                    <li>Tặng nước giặt</li>
                                    <li>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </li>
                                </div>
                                <li></li>
                            </div>
                            <div className="slider-prodouct-one-content-item">
                                <img src="/products/noi-com-dien-02-noi-com-nap-gai-nagakawa-1-2-lit-nrc3812.png" alt="" />
                                <div className="slider-prodouct-one-content-item-text">
                                    <li><img src="/icon1-50x50.webp" alt="" /> <p> Trợ giá mùa dịch</p></li>
                                    <li>Điều hòa Panasonic 1 HP</li>
                                    <li>Online giá rẻ </li>
                                    <li><a href="">11.490.000<sup>đ</sup></a><span>-17%</span></li>
                                    <li>9.490.000<sup>đ</sup></li>
                                    <li>Lắp đặt trong 24h</li>
                                    <li>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </li>
                                </div>
                                <li></li>
                            </div>
                            <div className="slider-prodouct-one-content-item">
                                <img src="/products/am-sieu-toc-02-binh-dun-sieu-toc-sunhouse-1-8-lit-shd1353.jpg" alt="" />
                                <div className="slider-prodouct-one-content-item-text">
                                    <li><img src="/icon1-50x50.webp" alt="" /> <p> Trợ giá mùa dịch</p></li>
                                    <li>Nồi chiên không dầu Panasonic 3.5 lít</li>
                                    <li>Online giá rẻ </li>
                                    <li><a href="">3.490.000<sup>đ</sup></a><span>-23%</span></li>
                                    <li>2.690.000<sup>đ</sup></li>
                                    <li>Giảm giá online</li>
                                    <li>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </li>
                                </div>
                                <li></li>
                            </div>
    
                        </div>
    
                    </div>
    
                    <div className="slider-prodouct-one-content-btn">
                        <i className="fa-solid fa-chevron-left"></i>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
    
            </div>
        </div>
    </section>
    <ProductSection title="Điện máy bán chạy" products={featuredProducts} onAddCart={handleAddCart} />
    <ProductSection title="Gia dụng nổi bật" products={monitorProducts} onAddCart={handleAddCart} />
    <ProductSection title="Đồ gia dụng đang khuyến mãi" products={accessoryProducts} onAddCart={handleAddCart} />
      </>
    );
};

export default TrangChuDienMay;
