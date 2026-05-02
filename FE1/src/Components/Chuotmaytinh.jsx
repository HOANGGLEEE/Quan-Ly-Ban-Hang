import React, { useEffect } from 'react';
import '../style/style.css';
import '../style/chuot.css';

const Chuotmaytinh = () => {
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
                                <li><a href="Sản Phẩm.html" > Màn hình máy tính</a></li>
                                <li><a href="TaiNghe.html" > Tai nghe</a></li>
                                <li><a href="chuotmaytinh.html" >Chuột máy tính</a></li>
                                <li><a href="Bàn Phím.html" >Bàn phím</a></li>
                                <li><a href="PC VanPhong.html" >PC Văn Phòng</a></li>
                                <li><a href="" >Card màn hình</a></li>
                                <li><a href="" 	>USB</a></li>
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
                        <li><a href='Sản Phẩm.html'>Chuột máy tính</a></li>
                    </ul>
            </div>
        <div className='product'>
                <div className='khung'>
                  <a href=""><img src="/img_chuot/chuot1.webp" alt="" /></a>
                  <div className='text'>
                      <p><a href=''>Chuột không dây Logitech M331</a></p>
                      <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>400.000<u>đ</u></del></p>
                      <h4 style={{color: "red"}}>340.000<u>đ</u></h4>
                      <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                          <span style={{fontSize: "70%"}}><b>5</b></span>
                      </a>
                    </div>
                </div>
                <div className='khung'>
                  <a href=""><img src="/img_chuot/chuot2.webp" alt="" /></a>
                  <div className='text'>
                      <p><a href=''>Chuột không dây Logitech Signature M650 Size L</a></p>
                      <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>890.000<u>đ</u></del></p>
                      <h4 style={{color: "red"}}>665.000<u>đ</u></h4>
                      <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                          <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                          <span style={{fontSize: "70%"}}><b>8 </b></span>
                      </a>
                    </div>
                </div>
                <div className='khung'>
                  <a href=""><img src="/img_chuot/chuot3.webp" alt="" /></a>
                  <div className='text'>
                      <p><a href=''>Chuột không dây Logitech Pebble M350	</a></p>
                      <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>599.000<u>đ</u></del></p>
                      <h4 style={{color: "red"}}>470.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_chuot/chuot4.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột không dây Gaming Razer Basilisk X HyperSpeed</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.290.000<u>đ</u></del></p>
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
        	  <a href=""><img src="/img_chuot/chuot5.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột có dây Gaming Dareu LM130S RGB</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>290.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>190.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>13</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_chuot/chuot6.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột không dây Logitech MX Anywhere 3</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>1.990.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>1.740.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <span style={{fontSize: "70%"}}><b>5 </b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_chuot/chuot7.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột có dây Gaming Dareu EM908 RGB</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>390.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_chuot/chuot8.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột có dây Gaming Logitech G402 Hyperion Fury Ultra</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>990.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>890.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>2 </b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_chuot/chuot9.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột Gaming Rapoo V16</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>300.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>250.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>20 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_chuot/chuot10.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột có dây Gaming Havit MS1006</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>300.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>250.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>11 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_chuot/chuot11.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột không dây Microsoft Arc</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>2.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>1.990.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>8 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_chuot/chuot12.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Chuột Bluetooth Microsoft Camo</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>699.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>549.000<u>đ</u></h4>
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

export default Chuotmaytinh;
