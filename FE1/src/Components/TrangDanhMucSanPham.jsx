import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/style.css';
import '../style/category-page.css';
import {
  accessoryProducts,
  monitorProducts,
  refrigeratorWasherProducts,
  tvProducts,
  usedProducts,
} from '../data/products';
import { addToCart, getCartCount } from '../utils/cart';
import DauTrangDienMay from './DauTrangDienMay';

const categoryConfig = {
  tivi: {
    title: 'Tivi',
    description: 'Các mẫu tivi bán chạy, giá dễ mua và có thể thêm thẳng vào giỏ hàng.',
    products: tvProducts,
  },
  refrigeratorWasher: {
    title: 'Máy giặt',
    description: 'Máy giặt cửa trước, cửa trên và máy giặt sấy cho nhu cầu gia đình.',
    products: refrigeratorWasherProducts,
  },
  used: {
    title: 'Điện máy khuyến mãi',
    description: 'Sản phẩm điện máy đang giảm giá, giá tốt và có bảo hành chính hãng.',
    products: usedProducts,
  },
  monitors: {
    title: 'Điều hòa',
    description: 'Điều hòa inverter, máy lạnh gia đình và các mẫu tiết kiệm điện.',
    products: monitorProducts,
  },
  accessories: {
    title: 'Đồ gia dụng',
    description: 'Nồi cơm điện và ấm siêu tốc đang có ưu đãi.',
    products: accessoryProducts,
  },
};

const PRODUCTS_PER_PAGE = 10;

const CategoryCard = ({ product, onAddCart }) => (
  <article className="category-card">
    <Link to={`/product-detail/${encodeURIComponent(product.code)}`} className="category-card-media">
      <img src={product.image} alt={product.name} />
    </Link>
    <div className="category-card-body">
      <span className="category-card-badge">{product.category}</span>
      <Link to={`/product-detail/${encodeURIComponent(product.code)}`} className="category-card-name">
        {product.name}
      </Link>
      <span className="category-card-code">Mã: {product.code}</span>
      <div className="category-card-price">
        <del>{product.oldPrice}đ</del>
        <strong>{product.price}đ</strong>
      </div>
      <p>{product.gift}</p>
      <button type="button" onClick={() => onAddCart(product)}>
        <i className="fa-solid fa-cart-plus"></i>
        Thêm vào giỏ
      </button>
    </div>
  </article>
);

const TrangDanhMucSanPham = ({ type }) => {
  const config = categoryConfig[type] || categoryConfig.accessories;
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const products = useMemo(() => config.products, [config.products]);
  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
  const visibleProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return products.slice(start, start + PRODUCTS_PER_PAGE);
  }, [page, products]);

  const handleAddCart = (product) => {
    addToCart(product);
    setCartCount(getCartCount());
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  return (
    <>
      <DauTrangDienMay cartCount={cartCount} />
      <main className="category-page">
        <section className="category-hero">
          <div>
            <span>Danh mục</span>
            <h1>{config.title}</h1>
            <p>{config.description}</p>
          </div>
          <Link to="/cart" className="category-cart-link">
            <i className="fa-solid fa-cart-shopping"></i>
            Giỏ hàng: {cartCount}
          </Link>
        </section>
        <section className="category-grid">
          {visibleProducts.map((product) => (
            <CategoryCard product={product} onAddCart={handleAddCart} key={product.code} />
          ))}
        </section>
        {totalPages > 1 && (
          <nav className="category-pagination" aria-label="Phân trang sản phẩm">
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                type="button"
                className={pageNumber === page ? 'active' : ''}
                onClick={() => setPage(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
              Sau
            </button>
          </nav>
        )}
      </main>
    </>
  );
};

export default TrangDanhMucSanPham;
