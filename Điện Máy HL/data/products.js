// ======= Dữ liệu sản phẩm (Điện máy) =======
// File này thay thế dữ liệu cũ (Sách). (Đã chuẩn hoá thông số)

var tags = [
  "Samsung",
  "LG",
  "Sony",
  "Panasonic",
  "Toshiba",
  "Electrolux",
  "Sharp",
  "Aqua",
  "Daikin",
  "Casper",
  "TV",
  "Tủ lạnh",
  "Máy giặt",
  "Điều hòa",
  "Nồi chiên",
  "Máy lọc",
  "Lò vi sóng",
  "Bếp từ",
  "Tủ đông"
];

var list_products = [
  {
    "masp": "Sam0",
    "name": "Tủ lạnh Samsung Inverter 260L",
    "company": "Samsung",
    "img": "img/products/t_l_nh_samsung_inverter_260l.jpg",
    "price": "6.990.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Tủ lạnh Samsung Inverter 260L",
      "baohanh": "24 tháng",
      "loai": "Tủ lạnh",
      "dungtich": "260 lít",
      "congnghe": "Inverter",
      "dien_tieu_thu": "1.0 kWh/ngày",
      "kich_thuoc": "700 x 1800 x 750 mm"
    }
  },
  {
    "masp": "Sam1",
    "name": "Smart TV Samsung 75 inch",
    "company": "Samsung",
    "img": "img/products/smart_tv_samsung_75_inch.jpg",
    "price": "19.990.000",
    "star": 5,
    "rateCount": 0,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Smart TV Samsung 75 inch",
      "baohanh": "24 tháng",
      "loai": "TV",
      "kich_co": "75 inch",
      "do_phan_giai": "4K UHD",
      "he_dieu_hanh": "Tizen",
      "cong_nghe_hinh_anh": "HDR10"
    }
  },
  {
    "masp": "Sam2",
    "name": "Máy giặt Samsung Cửa trên 9kg",
    "company": "Samsung",
    "img": "img/products/m_y_gi_t_samsung_c_a_tr_n_9kg.jpg",
    "price": "6.490.000",
    "star": 5,
    "rateCount": 120,
    "promo": {
      "name": "giamgia",
      "value": "200.000"
    },
    "detail": {
      "model": "Máy giặt Samsung Cửa trên 9kg",
      "baohanh": "24 tháng",
      "loai": "Máy giặt",
      "khoi_luong_giat": "9 kg",
      "kieu_may": "Cửa trên",
      "toc_do_vat": "1200 vòng/phút",
      "cong_nghe": "Inverter"
    }
  },
  {
    "masp": "Sam3",
    "name": "Điều hòa Samsung Inverter 1 HP",
    "company": "Samsung",
    "img": "img/products/_i_u_h_a_samsung_inverter_1_hp.jpg",
    "price": "11.490.000",
    "star": 3,
    "rateCount": 0,
    "promo": {
      "name": "giareonline",
      "value": "9.766.500"
    },
    "detail": {
      "model": "Điều hòa Samsung Inverter 1 HP",
      "baohanh": "24 tháng",
      "loai": "Điều hòa",
      "cong_suat": "1 HP",
      "loai_may": "Inverter",
      "gas": "R32",
      "tinh_nang": "Làm lạnh nhanh"
    }
  },
  {
    "masp": "LG0",
    "name": "4K UHD TV LG 65 inch",
    "company": "LG",
    "img": "img/products/4k_uhd_tv_lg_65_inch.jpg",
    "price": "6.990.000",
    "star": 5,
    "rateCount": 0,
    "promo": {
      "name": "moiramat",
      "value": ""
    },
    "detail": {
      "model": "4K UHD TV LG 65 inch",
      "baohanh": "24 tháng",
      "loai": "TV",
      "kich_co": "65 inch",
      "do_phan_giai": "4K UHD",
      "he_dieu_hanh": "webOS",
      "cong_nghe_hinh_anh": "HDR10"
    }
  },
  {
    "masp": "LG1",
    "name": "Máy giặt LG Cửa trước 9kg",
    "company": "LG",
    "img": "img/products/m_y_gi_t_lg_c_a_tr_c_9kg.jpg",
    "price": "4.990.000",
    "star": 4,
    "rateCount": 35,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Máy giặt LG Cửa trước 9kg",
      "baohanh": "24 tháng",
      "loai": "Máy giặt",
      "khoi_luong_giat": "9 kg",
      "kieu_may": "Cửa trước",
      "toc_do_vat": "1400 vòng/phút",
      "cong_nghe": "Inverter"
    }
  },
  {
    "masp": "LG2",
    "name": "Máy lọc không khí LG 55m²",
    "company": "LG",
    "img": "img/products/m_y_l_c_kh_ng_kh_lg_55m_.jpg",
    "price": "4.990.000",
    "star": 4,
    "rateCount": 35,
    "promo": {
      "name": "giamgia",
      "value": "300.000"
    },
    "detail": {
      "model": "Máy lọc không khí LG 55m²",
      "baohanh": "24 tháng",
      "loai": "Máy lọc không khí",
      "dien_tich_phong": "55 m²",
      "bo_loc": "HEPA H13",
      "do_on": "30 dB"
    }
  },
  {
    "masp": "LG3",
    "name": "Tủ lạnh LG Inverter 260L",
    "company": "LG",
    "img": "img/products/t_l_nh_lg_inverter_260l.jpg",
    "price": "17.990.000",
    "star": 4,
    "rateCount": 120,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Tủ lạnh LG Inverter 260L",
      "baohanh": "24 tháng",
      "loai": "Tủ lạnh",
      "dungtich": "260 lít",
      "congnghe": "Inverter",
      "dien_tieu_thu": "1.0 kWh/ngày",
      "kich_thuoc": "700 x 1800 x 750 mm"
    }
  },
  {
    "masp": "Son0",
    "name": "Google TV Sony 75 inch",
    "company": "Sony",
    "img": "img/products/google_tv_sony_75_inch.jpg",
    "price": "25.990.000",
    "star": 4,
    "rateCount": 0,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Google TV Sony 75 inch",
      "baohanh": "24 tháng",
      "loai": "TV",
      "kich_co": "75 inch",
      "do_phan_giai": "4K UHD",
      "he_dieu_hanh": "Google TV",
      "cong_nghe_hinh_anh": "HDR10"
    }
  },
  {
    "masp": "Son1",
    "name": "Google TV Sony 43 inch",
    "company": "Sony",
    "img": "img/products/google_tv_sony_43_inch.jpg",
    "price": "19.990.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "giareonline",
      "value": "18.990.500"
    },
    "detail": {
      "model": "Google TV Sony 43 inch",
      "baohanh": "24 tháng",
      "loai": "TV",
      "kich_co": "43 inch",
      "do_phan_giai": "4K UHD",
      "he_dieu_hanh": "Google TV",
      "cong_nghe_hinh_anh": "HDR10"
    }
  },
  {
    "masp": "Pan0",
    "name": "Điều hòa Panasonic 1 HP",
    "company": "Panasonic",
    "img": "img/products/_i_u_h_a_panasonic_1_hp.jpg",
    "price": "16.990.000",
    "star": 5,
    "rateCount": 120,
    "promo": {
      "name": "giareonline",
      "value": "15.630.800"
    },
    "detail": {
      "model": "Điều hòa Panasonic 1 HP",
      "baohanh": "24 tháng",
      "loai": "Điều hòa",
      "cong_suat": "1 HP",
      "loai_may": "Thường",
      "gas": "R32",
      "tinh_nang": "Làm lạnh nhanh"
    }
  },
  {
    "masp": "Pan1",
    "name": "Lò vi sóng Panasonic 20L",
    "company": "Panasonic",
    "img": "img/products/l_vi_s_ng_panasonic_20l.jpg",
    "price": "1.290.000",
    "star": 4,
    "rateCount": 260,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Lò vi sóng Panasonic 20L",
      "baohanh": "24 tháng",
      "loai": "Lò vi sóng",
      "dung_tich": "20 lít",
      "cong_suat": "800W",
      "chuc_nang": "Hâm nóng"
    }
  },
  {
    "masp": "Tos0",
    "name": "Tủ lạnh Toshiba Inverter 400L",
    "company": "Toshiba",
    "img": "img/products/t_l_nh_toshiba_inverter_400l.jpg",
    "price": "13.990.000",
    "star": 5,
    "rateCount": 120,
    "promo": {
      "name": "giamgia",
      "value": "1.000.000"
    },
    "detail": {
      "model": "Tủ lạnh Toshiba Inverter 400L",
      "baohanh": "24 tháng",
      "loai": "Tủ lạnh",
      "dungtich": "400 lít",
      "congnghe": "Inverter",
      "dien_tieu_thu": "1.0 kWh/ngày",
      "kich_thuoc": "700 x 1800 x 750 mm"
    }
  },
  {
    "masp": "Tos1",
    "name": "Máy giặt Toshiba Cửa trên 10.5kg",
    "company": "Toshiba",
    "img": "img/products/m_y_gi_t_toshiba_c_a_tr_n_10_5kg.jpg",
    "price": "4.990.000",
    "star": 4,
    "rateCount": 78,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Máy giặt Toshiba Cửa trên 10.5kg",
      "baohanh": "24 tháng",
      "loai": "Máy giặt",
      "khoi_luong_giat": "10.5 kg",
      "kieu_may": "Cửa trên",
      "toc_do_vat": "1200 vòng/phút",
      "cong_nghe": "Inverter"
    }
  },
  {
    "masp": "Ele0",
    "name": "Máy giặt Electrolux Cửa trước 9kg",
    "company": "Electrolux",
    "img": "img/products/m_y_gi_t_electrolux_c_a_tr_c_9kg.jpg",
    "price": "7.990.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "giamgia",
      "value": "300.000"
    },
    "detail": {
      "model": "Máy giặt Electrolux Cửa trước 9kg",
      "baohanh": "24 tháng",
      "loai": "Máy giặt",
      "khoi_luong_giat": "9 kg",
      "kieu_may": "Cửa trước",
      "toc_do_vat": "1400 vòng/phút",
      "cong_nghe": "Giặt hơi nước"
    }
  },
  {
    "masp": "Ele1",
    "name": "Tủ lạnh Electrolux Inverter 260L",
    "company": "Electrolux",
    "img": "img/products/t_l_nh_electrolux_inverter_260l.jpg",
    "price": "10.990.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Tủ lạnh Electrolux Inverter 260L",
      "baohanh": "24 tháng",
      "loai": "Tủ lạnh",
      "dungtich": "260 lít",
      "congnghe": "Inverter",
      "dien_tieu_thu": "1.0 kWh/ngày",
      "kich_thuoc": "700 x 1800 x 750 mm"
    }
  },
  {
    "masp": "Sha0",
    "name": "Máy lọc không khí Sharp 55m²",
    "company": "Sharp",
    "img": "img/products/m_y_l_c_kh_ng_kh_sharp_55m_.jpg",
    "price": "2.990.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "giareonline",
      "value": "2.691.000"
    },
    "detail": {
      "model": "Máy lọc không khí Sharp 55m²",
      "baohanh": "24 tháng",
      "loai": "Máy lọc không khí",
      "dien_tich_phong": "55 m²",
      "bo_loc": "HEPA H13",
      "do_on": "30 dB"
    }
  },
  {
    "masp": "Sha1",
    "name": "Lò vi sóng Sharp 30L",
    "company": "Sharp",
    "img": "img/products/l_vi_s_ng_sharp_30l.jpg",
    "price": "1.690.000",
    "star": 4,
    "rateCount": 260,
    "promo": {
      "name": "giamgia",
      "value": "800.000"
    },
    "detail": {
      "model": "Lò vi sóng Sharp 30L",
      "baohanh": "24 tháng",
      "loai": "Lò vi sóng",
      "dung_tich": "30 lít",
      "cong_suat": "800W",
      "chuc_nang": "Hâm nóng"
    }
  },
  {
    "masp": "Aqu0",
    "name": "Tủ lạnh Aqua Inverter 260L",
    "company": "Aqua",
    "img": "img/products/t_l_nh_aqua_inverter_260l.jpg",
    "price": "8.990.000",
    "star": 4,
    "rateCount": 0,
    "promo": {
      "name": "giamgia",
      "value": "200.000"
    },
    "detail": {
      "model": "Tủ lạnh Aqua Inverter 260L",
      "baohanh": "24 tháng",
      "loai": "Tủ lạnh",
      "dungtich": "260 lít",
      "congnghe": "Inverter",
      "dien_tieu_thu": "1.0 kWh/ngày",
      "kich_thuoc": "700 x 1800 x 750 mm"
    }
  },
  {
    "masp": "Aqu1",
    "name": "Máy giặt Aqua Cửa trước 8.5kg",
    "company": "Aqua",
    "img": "img/products/m_y_gi_t_aqua_c_a_tr_c_8_5kg.jpg",
    "price": "4.990.000",
    "star": 4,
    "rateCount": 0,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Máy giặt Aqua Cửa trước 8.5kg",
      "baohanh": "24 tháng",
      "loai": "Máy giặt",
      "khoi_luong_giat": "8.5 kg",
      "kieu_may": "Cửa trước",
      "toc_do_vat": "1400 vòng/phút",
      "cong_nghe": "Inverter"
    }
  },
  {
    "masp": "Dai0",
    "name": "Điều hòa Daikin 2 HP",
    "company": "Daikin",
    "img": "img/products/_i_u_h_a_daikin_2_hp.jpg",
    "price": "9.490.000",
    "star": 4,
    "rateCount": 260,
    "promo": {
      "name": "moiramat",
      "value": ""
    },
    "detail": {
      "model": "Điều hòa Daikin 2 HP",
      "baohanh": "24 tháng",
      "loai": "Điều hòa",
      "cong_suat": "2 HP",
      "loai_may": "Thường",
      "gas": "R32",
      "tinh_nang": "Làm lạnh nhanh"
    }
  },
  {
    "masp": "Dai1",
    "name": "Điều hòa Daikin Inverter 1 HP",
    "company": "Daikin",
    "img": "img/products/_i_u_h_a_daikin_inverter_1_hp.jpg",
    "price": "7.990.000",
    "star": 5,
    "rateCount": 35,
    "promo": {
      "name": "giareonline",
      "value": "7.590.500"
    },
    "detail": {
      "model": "Điều hòa Daikin Inverter 1 HP",
      "baohanh": "24 tháng",
      "loai": "Điều hòa",
      "cong_suat": "1 HP",
      "loai_may": "Inverter",
      "gas": "R32",
      "tinh_nang": "Làm lạnh nhanh"
    }
  },
  {
    "masp": "Cas0",
    "name": "Điều hòa Casper 1.5 HP",
    "company": "Casper",
    "img": "img/products/_i_u_h_a_casper_1_5_hp.jpg",
    "price": "7.990.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Điều hòa Casper 1.5 HP",
      "baohanh": "24 tháng",
      "loai": "Điều hòa",
      "cong_suat": "1.5 HP",
      "loai_may": "Thường",
      "gas": "R32",
      "tinh_nang": "Làm lạnh nhanh"
    }
  },
  {
    "masp": "Cas1",
    "name": "QLED TV Casper 55 inch",
    "company": "Casper",
    "img": "img/products/qled_tv_casper_55_inch.jpg",
    "price": "8.990.000",
    "star": 3,
    "rateCount": 78,
    "promo": {
      "name": "moiramat",
      "value": ""
    },
    "detail": {
      "model": "QLED TV Casper 55 inch",
      "baohanh": "24 tháng",
      "loai": "TV",
      "kich_co": "55 inch",
      "do_phan_giai": "4K UHD",
      "he_dieu_hanh": "Google TV",
      "cong_nghe_hinh_anh": "QLED"
    }
  },
  {
    "masp": "Pan2",
    "name": "Nồi chiên không dầu Panasonic 3.5L",
    "company": "Panasonic",
    "img": "img/products/n_i_chi_n_kh_ng_d_u_panasonic_3_5l.jpg",
    "price": "1.690.000",
    "star": 4,
    "rateCount": 78,
    "promo": {
      "name": "giareonline",
      "value": "1.605.500"
    },
    "detail": {
      "model": "Nồi chiên không dầu Panasonic 3.5L",
      "baohanh": "24 tháng",
      "loai": "Nồi chiên không dầu",
      "dung_tich": "3.5 lít",
      "cong_suat": "1400W",
      "chat_lieu_long": "Chống dính",
      "tinh_nang": "Hẹn giờ"
    }
  },
  {
    "masp": "Sam4",
    "name": "Nồi chiên không dầu Samsung 5.5L",
    "company": "Samsung",
    "img": "img/products/n_i_chi_n_kh_ng_d_u_samsung_5_5l.jpg",
    "price": "2.890.000",
    "star": 3,
    "rateCount": 78,
    "promo": {
      "name": "giamgia",
      "value": "800.000"
    },
    "detail": {
      "model": "Nồi chiên không dầu Samsung 5.5L",
      "baohanh": "24 tháng",
      "loai": "Nồi chiên không dầu",
      "dung_tich": "5.5 lít",
      "cong_suat": "1700W",
      "chat_lieu_long": "Chống dính",
      "tinh_nang": "Hẹn giờ"
    }
  },
  {
    "masp": "LG4",
    "name": "Bếp từ LG 1 vùng",
    "company": "LG",
    "img": "img/products/b_p_t_lg_1_v_ng.jpg",
    "price": "1.590.000",
    "star": 4,
    "rateCount": 12,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Bếp từ LG 1 vùng",
      "baohanh": "24 tháng",
      "loai": "Bếp từ",
      "so_vung_nau": "1 vùng",
      "cong_suat": "2000W",
      "tinh_nang": "Tự ngắt an toàn"
    }
  },
  {
    "masp": "Sha2",
    "name": "Tủ đông Sharp 200L",
    "company": "Sharp",
    "img": "img/products/t_ng_sharp_200l.jpg",
    "price": "4.990.000",
    "star": 5,
    "rateCount": 120,
    "promo": {
      "name": "moiramat",
      "value": ""
    },
    "detail": {
      "model": "Tủ đông Sharp 200L",
      "baohanh": "24 tháng",
      "loai": "Tủ đông",
      "dung_tich": "200 lít",
      "nhiet_do": "-18°C",
      "cong_nghe": "Dàn đồng"
    }
  },
  {
    "masp": "Tos2",
    "name": "Máy nước nóng Toshiba 15L",
    "company": "Toshiba",
    "img": "img/products/m_y_n_c_n_ng_toshiba_15l.jpg",
    "price": "1.490.000",
    "star": 3,
    "rateCount": 260,
    "promo": {
      "name": "",
      "value": ""
    },
    "detail": {
      "model": "Máy nước nóng Toshiba 15L",
      "baohanh": "24 tháng",
      "loai": "Máy nước nóng",
      "dung_tich": "15 lít",
      "kieu_may": "Gián tiếp",
      "tinh_nang": "Chống giật ELCB"
    }
  },
  {
    "masp": "Ele2",
    "name": "Bếp từ Electrolux 1 vùng",
    "company": "Electrolux",
    "img": "img/products/b_p_t_electrolux_1_v_ng.jpg",
    "price": "1.190.000",
    "star": 3,
    "rateCount": 78,
    "promo": {
      "name": "moiramat",
      "value": ""
    },
    "detail": {
      "model": "Bếp từ Electrolux 1 vùng",
      "baohanh": "24 tháng",
      "loai": "Bếp từ",
      "so_vung_nau": "1 vùng",
      "cong_suat": "2000W",
      "tinh_nang": "Tự ngắt an toàn"
    }
  }
];
