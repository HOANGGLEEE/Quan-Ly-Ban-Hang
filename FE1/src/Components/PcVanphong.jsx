import React, { useEffect } from 'react';
import '../style/style.css';
import '../style/PC.css';

const PcVanphong = () => {
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
                        <li><a href=''>»»</a></li>
                        <li><a href='Sản Phẩm.html'>PC Văn Phòng</a></li>
                    </ul>
            </div>
        <div className='main'>
        	<div className='khung'>
        	  <a href=""><img src="/img_pc/pc1.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>PC CPS văn phòng S3</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>13.180.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>8.130.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>35 </b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_pc/pc2.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>PC CPS văn phòng S1</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>9.590.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>6.490.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_pc/pc3.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Máy tính để bàn All In One văn phòng ASUS E5202WHAK BAO19W	</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>16.440.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>12.190.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_pc/pc4.webp" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Máy tính để bàn All In One văn phòng ASUS V241EAT</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>17.290.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>14.990.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>4</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_pc/pc5.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Mac Mini 2020 M1 8-core/8GB/512GB/Silver (MGNT3SA/A) </a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>19.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>13.950.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>3</b></span>
                  </a>
                </div>
        	</div>
            <div className='khung'>
        	  <a href=""><img src="/img_pc/pc6.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>HP EliteOne 870 G9 AIO i7 12700/16GB/512GB/4GB RTX3050Ti/27"Q/Bàn phím/Chuột/Win11</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>40.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>38.040.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_pc/pc7.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>HP AIO 22 df1019d i5 1135G7/4GB/512GB/21.5" FullHD/Touch/Bàn phím/Chuột/Win10</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>21.790.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>14.340.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_pc/pc8.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>HP Slim Desktop S01 pF2034d i3 12100/8GB/256GB/Bàn phím/Chuột/Win11</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>11.990.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>10.990.000<u>đ</u></h4>
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
        	  <a href=""><img src="/img_pc/pc9.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Dell Inspiron 3910 i5 12400/8GB/512GB/Bàn phím/Chuột/OfficeHS/Win11</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>15.990.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>15.120.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>4 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_pc/pc10.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>HP AIO 22 dd2012d i3 1215U/8GB/256GB/21.5"FullHD<br />/Bàn phím/Chuột/Win11 (6K7G5PA)</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>15.300.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>15.190.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>11</b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_pc/pc11.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Lenovo IdeaCentre AIO 3 24IAP7 i3 1215U/4GB/256GB/23.8"F/Bàn phím/Chuột/Win11</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>16.490.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>14.990.000<u>đ</u></h4>
                  <a ><i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#cfdc1e"}}></i>
                      <i className="fa-solid fa-star fa-xs" style={{color: "#c7c7c7"}}></i>
                      <span style={{fontSize: "70%"}}><b>8 </b></span>
                  </a>
                </div>
        	</div><div className='khung'>
        	  <a href=""><img src="/img_pc/pc12.jpg" alt="" /></a>
        	  <div className='text'>
                  <p><a href=''>Asus ExpertCenter AIO A3202WBAK i3 1215U/8GB/512GB/21.45"FullHD<br />/Bàn phím/Chuột/Win11</a></p>
                  <p style={{fontSize: "80%", color: "#666", marginBottom: "5px"}}><del>16.500.000<u>đ</u></del></p>
                  <h4 style={{color: "red"}}>14.750.000<u>đ</u></h4>
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

export default PcVanphong;
