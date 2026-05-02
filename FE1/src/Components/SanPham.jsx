import React, { useEffect } from 'react';
import '../style/style.css';
import '../style/sp.css';
import { storeProducts } from '../data/products';

const CatalogCard = ({ product }) => (
    <a href="Chi tiết sản phẩm.html" className="catalog-card">
        <span className="catalog-badge">{product.category}</span>
        <img src={product.image} alt={product.name} />
        <strong>{product.name}</strong>
        <span className="catalog-code">Mã: {product.code}</span>
        <span className="catalog-old-price">{product.oldPrice}<sup>đ</sup></span>
        <span className="catalog-price">{product.price}<sup>đ</sup></span>
        <span className="catalog-gift">{product.gift}</span>
        <span className="catalog-buy">Mua ngay</span>
    </a>
);

const SanPham = () => {
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

    return (
      <>
    <header>
        <img style={{width: "964.8px"}} src="/AnhDau.PNG" alt="" />
    </header>
    <nav>
        <div className="container">
            <ul>
                <li><a href="trangchu.html"><img style={{width: "150px"}} src="/logo.PNG" /></a></li>
                <li id="adres-form"><a href="#"><button>Xem giá ,tòn kho tại:<br />Hồ Chí Minh<i className="fa-solid fa-sort-down"></i></button></a>
                </li>
                <li><input type="text" placeholder="Bạn Muốn Tìm Gì" /><i className="fa-solid fa-magnifying-glass"></i></li>
                <li><a href=""></a><button><i className="fa-solid fa-cart-shopping"></i>Giỏ hàng</button></li>
                <li><a href="">Lịch sử <br />đơn hàng </a></li>
                <li><a href=""><span className="btn-containt"><span className="btn-top"></span></span> Thẻ nạp ngay</a></li>
                <li><a href="">24h Công Nghệ</a></li>
                <li><a href="dangki.html">ĐĂNG KÍ</a></li>
                <li><a href="Dangnhap.html">ĐĂNG NHẬP</a></li>
    
    
                <div className="adres-form">
                    <div className="adress-form-content">
                        <h2>Chọn địa chỉ nhận hàng<span id="adress-close">X Đóng</span> </h2>
                        <form action="">
                            <p>Chọn đầy đủ địa chỉ nhận hàng để biết chính xác thời gian giao</p>
                            <select name="" >
                                <option value="#">--Chọn địa điểm </option>
                                <option value="#">--Đà Nẵng </option>
                            </select>
                            <select name="" >
                                <option value="#">--Chọn Quận\Huyện </option>
                                <option value="#">--TP.HCM </option>
                            </select>
                            <select name="" >
                                <option value="#">--Chọn Phường\Xã </option>
                                <option value="#">--Đà Nẵng </option>
                            </select>
                            <input type="text" placeholder="Số nhà ,Tên đường" />
                            <button style={{backgroundColor: "#F97E0E", borderRadius: "5px", marginTop: "20px", height: "40px", width: "80%", cursor: "pointer", outline: "none", border: "none"}}>Xác Nhận </button>
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
                        <li><a href=""><i className="fa-solid fa-computer"></i> PC GIÁ RẺ</a></li>
                        <li><a href="PC VanPhong.html"><i className="fa-solid fa-computer"></i> PC VĂN PHÒNG</a></li>
                        <li><a href=""> MÁY CŨ GIÁ RẺ </a></li>
                        <li><a href="Sản Phẩm.html"><i className="fa-solid fa-desktop"></i> MÀN HÌNH MÁY TÍNH </a></li>
                        <li><a href="TaiNghe.html"><i className="fa-solid fa-headphones"></i> PHỤ KIỆN<i style={{marginLeft: "6px"}} className="fa-solid fa-sort-down"></i> </a></li>
                    </ul>
                </div>
            </div>
    </section>
    
    <div className='content'>
    	<div className='head'>
        	<div className='danhsach'>
                <div className='ds'>
                        <a href=''>
                        <i className="fa-solid fa-list" style={{color: "#004880"}}></i>
                        Danh sách sản phẩm</a>
                        <ul className="menu_list_1">
                            <li><a href="Sản Phẩm.html" > Màn hình máy tính</a></li>
                            <li><a href="TaiNghe.html" > Tai nghe</a></li>
                            <li><a href="chuotmaytinh.html">Chuột máy tính</a></li>
                            <li><a href="Bàn Phím.html" >Bàn phím</a></li>
                            <li><a href="PC VanPhong.html" >PC Văn Phòng</a></li>
                            <li><a href="" >Card màn hình</a></li>
                            <li><a href="" >USB</a></li>
                        </ul>
                </div>
            </div>
            <div className='find'>
            	<input type='text' placeholder="Nhập sản phầm cần tìm" size='70' />
                <a href='' id='find'>
                <img src='/find.png' />
                </a>
            </div>
            <div className='noti'>
            	<a href='' className='noti-logo'>
                <i className="fa-solid fa-bell fa-xl" style={{color: "#006370"}}></i>  Thông báo
                </a>
                <a href='' className='noti-logo'>
                <i className="fa-solid fa-bag-shopping fa-xl" style={{color: "#006370"}}></i>  Giỏ hàng của bạn (0) sản phẩm
                </a>
            </div>
        </div>
        <div className='sub-head'>
                <ul className='menu-sub-head'>
                    <li><a href='trangchu.html'><i className="fa-solid fa-house" style={{color: "#32373e"}}></i>  Trang Chủ</a></li>
                    <li><a href=''>»»</a></li>
                    <li><a href='Sản Phẩm.html'>Màn hình máy tính</a></li>
                </ul>
        </div>
        <div className='product'>
        	<div className='product-left'>
            	<div id='th'>
                    <p><b>Thương hiệu</b></p>
                    <input type='checkbox' id='a' name='a' value='a' />
                    <label htmlFor='a'>ACER</label><br />
                    <input type='checkbox' id='a1' name='a1' value='a1' />
                    <label htmlFor='a1'>AOC</label><br />
                    <input type='checkbox' id='a2' name='a2' value='a2' />
                    <label htmlFor='a2'>ASUS</label><br />
                    <input type='checkbox' id='a3' name='a3' value='a3' />
                    <label htmlFor='a3'>DELL</label><br />
                    <input type='checkbox' id='a4' name='a4' value='a4' />
                    <label htmlFor='a4'>GIGABYTE</label><br />
                    <input type='checkbox' id='a5' name='a5' value='a5' />
                    <label htmlFor='a5'>Huawei</label><br />
                    <input type='checkbox' id='a6' name='a6' value='a6' />
                    <label htmlFor='a6'>LG</label><br />
                    <input type='checkbox' id='a7' name='a7' value='a7' />
                    <label htmlFor='a7'>MSI</label><br />
                    <input type='checkbox' id='a8' name='a8' value='a8' />
                    <label htmlFor='a8'>SAMSUNG</label><br />
                    <input type='checkbox' id='a9' name='a9' value='a9' />
                    <label htmlFor='a9'>PHILIPS</label><br />
                    <input type='checkbox' id='a10' name='a10' value='a10' />
                    <label htmlFor='a10'>Lenovo</label><br />
                </div>
                <div id='kt'>
                	<p><b>Kích thước màn hình</b></p>
                    <input type='checkbox' id='b' name='b' value='b' />
                    <label htmlFor='b'>14"</label><br />
                    <input type='checkbox' id='b1' name='b1' value='b1' />
                    <label htmlFor='b1'>15.6"</label><br />
                    <input type='checkbox' id='b2' name='b2' value='b2' />
                    <label htmlFor='b2'>18.5"</label><br />
                    <input type='checkbox' id='b3' name='a3' value='b3' />
                    <label htmlFor='b3'>19"</label><br />
                    <input type='checkbox' id='b4' name='a4' value='b4' />
                    <label htmlFor='b4'>20"</label><br />
                    <input type='checkbox' id='b5' name='a5' value='b5' />
                    <label htmlFor='b5'>21.5"</label><br />
                    <input type='checkbox' id='b6' name='a6' value='b6' />
                    <label htmlFor='b6'>22"</label><br />
                    <input type='checkbox' id='b7' name='b7' value='b7' />
                    <label htmlFor='b7'>24"</label><br />
                    <input type='checkbox' id='b9' name='b9' value='b9' />
                    <label htmlFor='b9'>24.5"</label><br />
                    <input type='checkbox' id='b11' name='b11' value='11' />
                    <label htmlFor='b11'>25"</label><br />
                    <input type='checkbox' id='b12' name='b12' value='b12' />
                    <label htmlFor='b12'>27"</label><br />
                    <input type='checkbox' id='b13' name='b13' value='b13' />
                    <label htmlFor='b13'>28"</label><br />
                    <input type='checkbox' id='b14' name='b14' value='b14' />
                    <label htmlFor='b14'>29"</label><br />
                    <input type='checkbox' id='b15' name='b15' value='b15' />
                    <label htmlFor='b15'>30"</label><br />
                    <input type='checkbox' id='b16' name='b16' value='b16' />
                    <label htmlFor='b16'>31.5"</label><br />
                    <input type='checkbox' id='b17' name='b17' value='b17' />
                    <label htmlFor='b17'>32"</label><br />
                </div>
                <div id='dpg'>
                	<p><b>Độ phân giải</b></p>
                    <input type='checkbox' id='c' name='c' value='c' />
                    <label htmlFor='c'>1366 x 768</label><br />
                    <input type='checkbox' id='c1' name='c1' value='c1' />
                    <label htmlFor='c1'>1440 x 900</label><br />
                    <input type='checkbox' id='c2' name='c2' value='c2' />
                    <label htmlFor='c2'>1600 x 900</label><br />
                    <input type='checkbox' id='c3' name='c3' value='c3' />
                    <label htmlFor='c3'>1920 x 1080</label><br />
                    <input type='checkbox' id='c4' name='c4' value='c4' />
                    <label htmlFor='c4'>1920 x 1200</label><br />
                    <input type='checkbox' id='c5' name='c5' value='c5' />
                    <label htmlFor='c5'>2560 x 1080</label><br />
                    <input type='checkbox' id='c6' name='c6' value='c6' />
                    <label htmlFor='c6'>2560 x 1440</label><br />
                    <input type='checkbox' id='c7' name='c7' value='c7' />
                    <label htmlFor='c7'>2560 x 1600</label><br />
                    <input type='checkbox' id='c9' name='c9' value='c9' />
                    <label htmlFor='c9'>2560 x 2880</label><br />
                    <input type='checkbox' id='c11' name='c11' value='c11' />
                    <label htmlFor='c11'>3440 x 1440</label><br />
                    <input type='checkbox' id='c12' name='c12' value='c12' />
                    <label htmlFor='c12'>3840 x 1600</label><br />
                </div>
                <div id='tn'>
                	<p><b>Tấm nền</b></p>
                    <input type='checkbox' id='d' name='d' value='d' />
                    <label htmlFor='d'>Fast IPS</label><br />
                    <input type='checkbox' id='d1' name='d1' value='d1' />
                    <label htmlFor='d1'>IPS</label><br />
                    <input type='checkbox' id='d2' name='d2' value='d2' />
                    <label htmlFor='d2'>MVA</label><br />
                    <input type='checkbox' id='d3' name='d3' value='d3' />
                    <label htmlFor='d3'>Nano IPS</label><br />
                    <input type='checkbox' id='d4' name='d4' value='d4' />
                    <label htmlFor='d4'>OLED</label><br />
                    <input type='checkbox' id='d5' name='d5' value='d5' />
                    <label htmlFor='d5'>PLS</label><br />
                    <input type='checkbox' id='d6' name='d6' value='d6' />
                    <label htmlFor='d6'>RAPID IPS</label><br />
                    <input type='checkbox' id='d7' name='d7' value='d7' />
                    <label htmlFor='d7'>TN</label><br />
                    <input type='checkbox' id='a9' name='a9' value='a9' />
                    <label htmlFor='d9'>VA</label><br />
                </div>
            </div>
            <div className='product-right'>
                <table className='table' >
                    <tr className='tr'>
                        <td className='td'>
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp1.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính Tomko 27 inch 2K IPS <br />75Hz T2721F-2K</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: T2721F-2K</a>
                              <h3 >4.170.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>5.000.000đ</del></span>
                              </h3>
    
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp2.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn máy tính Tomko cong 38 inch GX389Q</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: GX389Q</a>
                              <h3 >26.170.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>27.000.000đ</del></span></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
    
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp6.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính Tomko 27 inch 2K IPS</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: B2721F-2K</a>
                              <h3 >5.100.000<ins>đ</ins></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
    
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp4.jpg'	 className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn máy tính 27″Tomko T2721Q</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: T2721FC</a>
                              <h3 >4.500.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>5.000.000đ</del></span></h3>
                               <a>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#c7c7c7"}}></i>
                              </a>
                            </div>
                        </td>
                     </tr>
                     <tr className='tr'>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp3.jfif' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính Tomko 24 inch 144Hz IPS<br /> GX241F</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: GX241F</a>
                              <h3 >5.000.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>5.500.000đ</del></span></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
                             <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp10.jfif' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn máy tính Tomko 24″ T2421F</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: T2421F</a>
                              <h3 >2.670.000<ins>đ</ins></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp7.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính Tomko 21.5 inch FULL HD</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: C2721F-2K</a>
                              <h3 >1.900.000<ins>đ</ins> <span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>2.000.000đ</del></span></h3>
                              <a>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#c7c7c7"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp8.png' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn Hình Máy Tính Gaming 27 inch ATAS</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: T1721BC</a>
                              <h3 >5.500.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>6.000.000đ</del></span></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                     </tr>
                     <tr className='tr'>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp9.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính ATAS 27 inch 2K</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: T1220F-2K</a>
                              <h3 >6.170.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>7.000.000đ</del></span></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp5.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn máy tính ATAS không viền 27 inch</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: TX389Q</a>
                              <h3 >7.170.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>8.000.000đ</del></span></h3>
                              <a>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#c7c7c7"}}></i>
                              </a>
                            </div>
                        </td>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp12.jpg' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính Tomko 27 inch 75HZ</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: C2721F-2k</a>
                              <h3 >3.100.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>3.900.000đ</del></span></h3>
                                  <a>
                                  <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                                  <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                                  <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                                  <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                                  <i className="fa-solid fa-star fa-xl" style={{color: "#c7c7c7"}}></i>
                                  </a>
                            </div>
                        </td>
                        <td className='td' >
                            <div className='top'>
                              <a href='Chi tiết sản phẩm.html'>
                                <img src='/sp111.jfif' className='img' />
                              </a><br />
                              <a href='Chi tiết sản phẩm.html' className='buy'>Mua ngay</a>
                            </div>
                            <div className='info'>
                              <a href='Chi tiết sản phẩm.html' className='text'>Màn hình máy tính 27 inch 2K ATAS MD270B</a><br />
                              <a href='Chi tiết sản phẩm.html' className='text'>Mã: MD270B</a>
                              <h3 >4.190.000<ins>đ</ins><span style={{fontSize: "80%", marginLeft: "10px", color: "black"}}><del>5.000.000đ</del></span></h3>
                              <a ><i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              <i className="fa-solid fa-star fa-xl" style={{color: "#cfdc1e"}}></i>
                              </a>
                            </div>
                        </td>
                     </tr>
                </table>
                <div className="catalog-extra">
                    <div className="catalog-extra-title">
                        <h2>Gợi ý thêm cho bạn</h2>
                        <span>{storeProducts.length} sản phẩm đang bán</span>
                    </div>
                    <div className="catalog-grid">
                        {storeProducts.map((product) => (
                            <CatalogCard product={product} key={product.code} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
      </>
    );
};

export default SanPham;
