import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/style1.css';

const DangKy = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: true,
    });
    const [message, setMessage] = useState('');

    const updateForm = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.password) {
            setMessage('Vui lòng nhập đầy đủ họ tên, email và mật khẩu.');
            return;
        }

        if (form.password.length < 6) {
            setMessage('Mật khẩu nên có ít nhất 6 ký tự.');
            return;
        }

        if (form.password !== form.confirmPassword) {
            setMessage('Mật khẩu xác nhận chưa khớp.');
            return;
        }

        if (!form.agree) {
            setMessage('Bạn cần đồng ý với điều khoản trước khi đăng ký.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const email = form.email.trim().toLowerCase();
        if (users.some((user) => user.email?.toLowerCase() === email)) {
            setMessage('Email này đã được đăng ký. Vui lòng đăng nhập.');
            return;
        }

        users.push({
            name: form.name.trim(),
            email,
            username: email,
            password: form.password,
            createdAt: new Date().toISOString(),
        });

        localStorage.setItem('users', JSON.stringify(users));
        navigate('/login');
    };

    return (
        <div className="register-screen">
            <div className="register-card">
                <div className="register-visual">
                    <Link to="/" className="register-logo">
                        <img src="/logo.PNG" alt="Logo" />
                    </Link>
                    <div>
                        <span>Tech Store</span>
                        <h1>Tạo tài khoản mua sắm</h1>
                        <p>Lưu thông tin giao hàng, theo dõi đơn và nhận ưu đãi công nghệ mỗi ngày.</p>
                    </div>
                </div>

                <div className="register-form-panel">
                    <div className="auth-form-outer">
                        <div className="register-heading">
                            <span>Bắt đầu ngay</span>
                            <h2>Tạo tài khoản</h2>
                            <p>Dùng email của bạn để đăng ký tài khoản mới.</p>
                        </div>
                        {message && <div className="register-message">{message}</div>}
                        <form className="login-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="auth-form-input"
                                placeholder="Họ và tên"
                                value={form.name}
                                onChange={(e) => updateForm('name', e.target.value)}
                            />
                            <input
                                type="email"
                                className="auth-form-input"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => updateForm('email', e.target.value)}
                            />
                            <div className="input-icon">
                                <input
                                    type="password"
                                    className="auth-form-input"
                                    placeholder="Mật khẩu"
                                    value={form.password}
                                    onChange={(e) => updateForm('password', e.target.value)}
                                />
                                <i className="fa fa-eye show-password"></i>
                            </div>
                            <input
                                type="password"
                                className="auth-form-input"
                                placeholder="Nhập lại mật khẩu"
                                value={form.confirmPassword}
                                onChange={(e) => updateForm('confirmPassword', e.target.value)}
                            />
                            <label className="btn active">
                                <input
                                    type="checkbox"
                                    name='email1'
                                    checked={form.agree}
                                    onChange={(e) => updateForm('agree', e.target.checked)}
                                />
                                <i className="fa fa-square-o"></i><i className="fa fa-check-square-o"></i>
                                <span> Tôi đồng ý với <a href="#">Điều Khoản</a> và <a href="#">Chính Sách</a>.</span>
                            </label>
                            <div className="footer-action">
                                <input type="submit" value="Đăng Kí" className="auth-submit" />
                                <Link to="/login" className="auth-btn-direct">Đăng Nhập</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DangKy;
