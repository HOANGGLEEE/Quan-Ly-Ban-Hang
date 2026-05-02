import React, { useState } from 'react';
import '../style/index.css';
import { api } from '../services/api';

const Login = ({ onLogin, onBack }) => {
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang web
    setError('');
    const formData = new FormData(e.currentTarget);
    try {
      const user = await api.login({
        username: formData.get('username'),
        password: formData.get('password'),
      });
      if (!user) {
        setError('Sai tài khoản hoặc mật khẩu.');
        return;
      }
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Không thể đăng nhập.');
    }
  };

  return (
    <div className="login-page">
      <section className="login-card" role="region" aria-label="Form đăng nhập">
        <h1 id="loginTitle" className="title">Đăng nhập</h1>
        
        <form onSubmit={handleLogin} className="form">
          <label htmlFor="username" className="label">Tài khoản</label>
          <input
            id="username"
            name="username"
            type="text"
            className="input"
            placeholder="Nhập tài khoản admin"
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
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {error && <p className="muted">{error}</p>}
          
          <button type="submit" className="btn-submit">Đăng nhập</button>
          {onBack && <button type="button" className="btn secondary" onClick={onBack} style={{ width: '100%', marginTop: 10 }}>Quay lại cửa hàng</button>}
        </form>
      </section>
    </div>
  );
};

export default Login;
