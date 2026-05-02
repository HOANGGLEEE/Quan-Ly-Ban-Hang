import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/dangnhap.css';

const QuenMatKhau = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState(null);
    const [resetCode, setResetCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const targetEmail = email.trim().toLowerCase();
        const matchedUser = users.find((user) => user.email?.toLowerCase() === targetEmail);
        const demoMatched = targetEmail === 'admin@gmail.com' || targetEmail === 'admin';

        if (!targetEmail || !name.trim()) {
            setStatus({ type: 'error', text: 'Vui lòng nhập họ tên và email/tên đăng nhập.' });
            return;
        }

        if (!matchedUser && !demoMatched) {
            setStatus({ type: 'error', text: 'Không tìm thấy tài khoản phù hợp. Hãy kiểm tra lại thông tin.' });
            setResetCode('');
            return;
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setResetCode(code);
        setStatus({
            type: 'success',
            text: 'Đã tìm thấy tài khoản. Mã xác nhận demo được hiển thị bên dưới.',
        });
    };

    return (
        <section className="forgot-screen">
            <div className="forgot-card">
                <Link to="/" className="forgot-logo">
                    <img src="/logo.PNG" alt="Logo" />
                </Link>

                <div className="login-heading">
                    <span>Khôi phục tài khoản</span>
                    <h2>Quên mật khẩu</h2>
                    <p>Nhập thông tin tài khoản. Hệ thống sẽ kiểm tra và tạo mã xác nhận demo cho bạn.</p>
                </div>

                {status && (
                    <div className={`auth-message ${status.type === 'success' ? 'auth-message-success' : 'auth-message-error'}`}>
                        {status.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form-modern">
                    <label className="auth-field">
                        <span>Họ tên</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setStatus(null);
                            }}
                            placeholder="Nhập họ tên đã đăng ký"
                        />
                    </label>

                    <label className="auth-field">
                        <span>Email hoặc tên đăng nhập</span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setStatus(null);
                                setResetCode('');
                            }}
                            placeholder="Ví dụ: admin@gmail.com"
                        />
                    </label>

                    {resetCode && (
                        <div className="reset-result">
                            <span>Mã xác nhận demo</span>
                            <strong>{resetCode}</strong>
                            <p>Trong dự án thật, mã này sẽ được gửi qua email hoặc SMS.</p>
                        </div>
                    )}

                    <button type="submit" className="auth-primary-btn">Tìm tài khoản</button>

                    <div className="forgot-actions">
                        <button type="button" onClick={() => navigate('/login')}>Quay lại đăng nhập</button>
                        <button type="button" onClick={() => navigate('/')}>Về trang chủ</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default QuenMatKhau;
