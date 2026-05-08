import React, { useState } from 'react';
import { Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from 'lucide-react';
import '../style/index.css';
import { api } from '../services/api';

const Login = ({ onLogin, onBack }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await api.login({ username, password });
      if (!user) {
        setError('Sai tài khoản hoặc mật khẩu.');
        return;
      }
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Không thể đăng nhập.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-card" role="region" aria-label="Form đăng nhập">
        <div className="login-brand">
          <div className="logo">DM</div>
          <div>
            <h1 id="loginTitle" className="login-title">Đăng nhập</h1>
            <p>Điện máy HL - Quản lý bán hàng</p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="username" className="label">Tài khoản</label>
          <div className="login-field">
            <UserRound className="login-field-icon" />
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              placeholder="Nhập tài khoản"
              autoComplete="username"
              required
              autoFocus
            />
          </div>

          <label htmlFor="password" className="label">Mật khẩu</label>
          <div className="login-field">
            <LockKeyhole className="login-field-icon" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          
          <button type="submit" className="btn login-submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="login-spinner" />}
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
          {onBack && <button type="button" className="btn secondary login-back" onClick={onBack}>Quay lại cửa hàng</button>}
        </form>
      </section>
    </div>
  );
};

export default Login;
