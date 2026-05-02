import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook chuyển trang
import '../style/index.css';

const Login = () => {
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng

  const handleFakeLogin = (e) => {
    e.preventDefault(); // Ngăn form reload lại trang web
    navigate('/ban-hang'); 
  };

  return (
    <div className="login-page">
      <section className="login-card" role="region" aria-label="Form đăng nhập">
        <h1 id="loginTitle" className="title">Đăng nhập</h1>
        
        {/* Gọi hàm handleFakeLogin khi bấm submit */}
        <form onSubmit={handleFakeLogin} className="form">
          <label htmlFor="username" className="label">Tài khoản</label>
          <input
            id="username"
            name="username"
            type="text"
            className="input"
            placeholder="Nhập tài khoản (bất kỳ)"
            required
            autoFocus
          />

          <label htmlFor="password" className="label">Mật khẩu</label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="Nhập mật khẩu (bất kỳ)"
              required
            />
          </div>
          
          <button type="submit" className="btn-submit">Đăng nhập</button>
        </form>
      </section>
    </div>
  );
};

export default Login;