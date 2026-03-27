var currentuser;

window.onload = function () {
  khoiTao();
  autocomplete(document.getElementById('search-box'), list_products);

  currentuser = getCurrentUser();

  // Nếu có đơn hàng tạm từ giỏ hàng => tính tổng tiền để hiển thị
  var temp = localStorage.getItem('DonHangDangThanhToan');
  if (temp) {
    try {
      temp = JSON.parse(temp);
      var total = 0;

      if (temp.products && temp.products.length) {
        for (var item of temp.products) {
          var p = timKiemTheoMa(list_products, item.ma);
          if (!p) continue;
          var price = (p.promo.name == 'giareonline' ? p.promo.value : p.price);
          total += stringToNum(price) * item.soluong;
        }
      }
      document.getElementById('payTotal').innerText = numToString(total) + ' ₫';
    } catch (e) {}
  }
};

function veTrangChu() {
  window.location.href = 'index.html';
}

function xacNhanThanhToan() {
  var c_user = getCurrentUser();

  if (!c_user) {
    alert('Bạn chưa đăng nhập!');
    return;
  }

  if (c_user.off) {
    alert('Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!');
    addAlertBox('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
    return;
  }

  if (!c_user.products || !c_user.products.length) {
    addAlertBox('Không có mặt hàng nào cần thanh toán !!', '#ffb400', '#fff', 2000);
    return;
  }

  // ✅ giống logic cũ: confirm -> push donhang -> clear products -> update -> alert
  if (window.confirm('Xác nhận bạn đã thanh toán chuyển khoản?')) {
    c_user.donhang.push({
      "sp": c_user.products,
      "ngaymua": new Date(),
      "tinhTrang": 'Đang chờ xử lý'
    });

    c_user.products = [];

    // cập nhật localStorage y như capNhatMoiThu() đã làm
    setCurrentUser(c_user);
    updateListUser(c_user);
    capNhat_ThongTin_CurrentUser();

    // xóa đơn tạm
    localStorage.removeItem('DonHangDangThanhToan');

    addAlertBox('Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.', '#17c671', '#fff', 4000);

    // chuyển qua trang người dùng xem đơn
    setTimeout(function () {
      window.location.href = 'nguoidung.html';
    }, 600);
  }
}
