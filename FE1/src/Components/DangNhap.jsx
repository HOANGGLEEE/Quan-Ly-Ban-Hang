import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/dangnhap.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const ADMIN_FE_URL = import.meta.env.VITE_ADMIN_FE_URL || 'http://localhost:5173';

const normalizeText = (value) => {
    if (value === undefined || value === null) return '';
    return String(value).trim().toLowerCase();
};

const isAdminAccount = (account) => {
    const role = normalizeText(account?.role ?? account?.QUYEN ?? account?.quyen);
    return role === 'admin' || role === '1' || role === 'quantri' || role === 'quản trị';
};

const DangNhap = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginName = username.trim();
        if (!loginName || !password) {
            setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/Login/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginName, password }),
            });
            const payload = await response.json();
            if (!response.ok) {
                throw new Error(payload?.message || payload?.error || 'Không thể đăng nhập.');
            }

            const account = Object.prototype.hasOwnProperty.call(payload, 'data') ? payload.data : payload;
            if (!account) {
                setError('Tài khoản hoặc mật khẩu chưa đúng.');
                return;
            }

            if (!isAdminAccount(account)) {
                setError('Chỉ tài khoản admin được vào trang quản trị.');
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify({
                name: account.username || account.USERNAME || loginName,
                username: account.username || account.USERNAME || loginName,
                role: 'admin',
            }));
            localStorage.setItem('rememberLogin', remember.toString());
            onLogin?.();
            window.location.href = ADMIN_FE_URL;
        } catch (err) {
            setError(err.message || 'Không thể đăng nhập.');
        }
    };

    return (
        <section className="login-screen">
            <div className="login-visual">
                <Link to="/" className="login-logo">
                    <img src="/logo.PNG" alt="Logo" />
                </Link>
                <div className="login-visual-content">
                    <span>Tech Store</span>
                    <h1>Mua sắm thiết bị công nghệ dễ dàng hơn</h1>
                    <p>Theo dõi đơn hàng, lưu sản phẩm yêu thích và nhận ưu đãi riêng cho tài khoản của bạn.</p>
                </div>
            </div>

            <div className="login-panel">
                <div className="login-card">
                    <div className="login-heading">
                        <span>Chào mừng trở lại</span>
                        <h2>Đăng nhập</h2>
                        <p>Nhập tài khoản để tiếp tục mua sắm và quản lý đơn hàng.</p>
                    </div>

                    {error && <div className="auth-message auth-message-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="login-form-modern">
                        <label className="auth-field">
                            <span>Email hoặc tên đăng nhập</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError('');
                                }}
                                placeholder="Ví dụ: admin@gmail.com"
                                autoComplete="username"
                            />
                        </label>

                        <label className="auth-field">
                            <span>Mật khẩu</span>
                            <div className="password-field">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Nhập mật khẩu"
                                    autoComplete="current-password"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Ẩn' : 'Hiện'}
                                </button>
                            </div>
                        </label>

                        <div className="login-options">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                Nhớ đăng nhập
                            </label>
                            <Link to="/forgot-password">Quên mật khẩu?</Link>
                        </div>

                        <button type="submit" className="auth-primary-btn">Đăng nhập</button>

                        <div className="demo-account">
                            Dùng tài khoản admin trong bảng TAIKHOAN.
                        </div>
                    </form>

                    <div className="auth-divider"><span>hoặc</span></div>

                    <div className="social-login">
                        <button type="button">Google</button>
                        <button type="button">Facebook</button>
                    </div>

                    <p className="auth-switch">
                        Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DangNhap;
