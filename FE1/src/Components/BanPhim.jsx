import React, { useEffect } from 'react';
import '../style/style.css';
import '../style/banphim.css';

const BanPhim = () => {
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
                    <li><a href='trangchu.html'><img style={{width: "150px"}} src="/logo.PNG" /></a></li>
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
        <div className='head'>
                <div className='danhsach'>
                    <div className='ds'>
                            <a href=''>
                            <i className="fa-solid fa-list" style={{color: "#004880"}}></i>
                            Danh sách sản phẩm</a>
                            <ul className="menu_list_1">
                                <li><a href="Sản Phẩm.html" > Màn hình máy tính</a></li>
                                <li><a href="TaiNghe.html" > Tai nghe</a></li>
                                <li><a href="chuotmaytinh.html" >Chuột máy tính</a></li>
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
                        <li><a href=''>Tiếp</a></li>
                        <li><a href='Sản Phẩm.html'>Bàn phím</a></li>
                    </ul>
            </div>
        <div className='product'>
                <div className='khung'>
                  <a href=""><img src="/img_banphim/banphim1.webp" alt="" /></a>
                  <div className='text'>
                      <p><a href=''>Bàn phím Gaming Rapoo V58</a></p>
                      <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>440.000<u>đ</u></del></p>
                      <h4 style={{color: "red"}}>320.000<u>đ</u></h4>
                      <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                          <span style={{fontSize: "70%"}}><b>6</b></span>
                      </a>
                    </div>
                </div>
                <div className='khung'>
                  <a href=""><img src="/img_banphim/banphim2.webp" alt="" /></a>
                  <div className='text'>
                      <p><a href=''>Bàn phím cơ không dây FL-Esports FL980SAM Polar</a></p>
                      <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>890.000<u>đ</u></del></p>
                      <h4 style={{color: "red"}}>665.000<u>đ</u></h4>
                      <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                          <span style={{fontSize: "70%"}}><b>1 </b></span>
                      </a>
                    </div>
                </div>
                <div className='khung'>
                  <a href=""><img src="/img_banphim/banphim3.webp" alt="" /></a>
                  <div className='text'>
                      <p><a href=''>Bàn phím cơ Gaming Asus TUF K3	</a></p>
                      <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.890	.000<u>đ</u></del></p>
                      <h4 style={{color: "red"}}>1.790.000<u>đ</u></h4>
                      <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <span style={{fontSize: "70%"}}><b>15 </b></span>
                      </a>
                    </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim4.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím cơ Rapoo V500 Pro Pink White (Red Switch)</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>990.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>890.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>10</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim5.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím cơ Rapoo V500 Pro Pink White</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>890.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>790.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>10</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim6.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím cơ có dây Gaming MSI Vigor GK50 Elite</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>2.590.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>2.490.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <span style={{fontSize: "70%"}}><b>3 </b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim7.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn Phím Gaming ZADEZ G-852K
    </a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>600.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>490.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>2 </b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim8.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím có dây Logitech K120</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>190.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>170.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>20 </b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim9.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím cơ AKKO 3087 RF</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>1.400.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>2 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim10.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím Apple Magic Keyboard + Touch ID 2021 MK293 | Chính hãng Apple Việt Nam</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>4.500.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>3.690.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>4 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim11.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím cơ có dây Havit KB869l	</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>890.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>5409.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>1 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_banphim/banphim12.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Bàn phím cơ AKKO 3108 Plus</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.699.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>1.550.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>4 </b></span>
                  </a>
                </div>
        </div>
    </div>
      </>
    );
};

export default BanPhim;
