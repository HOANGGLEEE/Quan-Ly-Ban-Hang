import React, { useEffect } from 'react';
import '../style/style.css';
import '../style/tainghe.css';

const Tainghe = () => {
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
                            <li><a href=""><i className="fa-solid fa-headphones"></i> PHỤ KIỆN<i style={{marginLeft: "6px"}} className="fa-solid fa-sort-down"></i> </a></li>
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
                                <li><a href="Sản Phẩm.html"> Màn hình máy tính</a></li>
                                <li><a href="TaiNghe.html" > Tai nghe</a></li>
                                <li><a href="chuotmaytinh.html" >Chuột máy tính</a></li>
                                <li><a href="Bàn Phím.html" >Bàn phím</a></li>
                                <li><a href="PC VanPhong.html" >PC Văn Phòng</a></li>
                                <li><a href="">Card màn hình</a></li>
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
                        <li><a href='Sản Phẩm.html'>Tai nghe</a></li>
                    </ul>
            </div>
        <div className='main'>
        	<div className='khung'>
        	  <a href=""><img src='/img_tainghe/tainghe1.webp' alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Soul Ultra Dynamic</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.690.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>830.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>36 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe2.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Gaming Havit H2012D RGB</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>590.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>490.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>55 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe3.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Edifier W820NB	</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.440.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>1.190.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <span style={{fontSize: "70%"}}><b>15 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe4.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Marshall Major 4</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>4.290.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>3.990.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>10 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe5.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe Bluetooth JBL T115BT</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>450.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>23 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe6.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe không dây JBL Tune 115 TWS</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>1.040.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <span style={{fontSize: "70%"}}><b>5 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe7.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Gaming Havit HV-H2232D</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>790.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>340.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>3 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe8.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Edifier WH950NB</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>4.990.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>3.990.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>2 Đánh giá</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe9.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe Devia Kintone Series Mental</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>140.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>120.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>20 Đánh giá</b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe10.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe chụp tai Gaming Sony Inzone H7</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>5.300.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>4.290.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>11 Đánh giá</b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe11.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe không dây EarFun Air S</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>990.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>8 Đánh giá</b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_tainghe/tainghe12.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Tai nghe Bluetooth SoundCore Life P2 A3919</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.500.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>950.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>4 Đánh giá</b></span>
                  </a>
                </div>
        </div>
    </div>
      </>
    );
};

export default Tainghe;
