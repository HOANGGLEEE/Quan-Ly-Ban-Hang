# Phat_trien_phan_mem_huong_dich_vu

## Kết nối FE với BE

FE hiện gọi API qua biến:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Backend khớp trực tiếp với FE là `BE/Project_QuanLyBanLe_Node`, vì backend này expose các route dạng `/api/QuanLySanPham/...`, `/api/Login/...`, `/api/QuanLyBanHang/...`.

## Chạy BE Node

```powershell
cd BE\Project_QuanLyBanLe_Node
npm install
copy .env.example .env
npm run dev
```

Kiểm tra BE:

```powershell
curl http://localhost:3000/api/health
```

Nếu dùng SQL Server named instance như `SQLEXPRESS`, giữ:

```env
DB_SERVER=localhost\SQLEXPRESS
```

Nếu SQL Server nghe port cố định, dùng:

```env
DB_SERVER=localhost
DB_PORT=1433
```

## Chạy FE

```powershell
cd FE
npm install
copy .env.example .env
npm run dev
```

Mở URL Vite in ra terminal, thường là `http://localhost:5173`.

## Ghi chú về BE .NET

Thư mục `BE/Project_QuanLyBanLe` là cụm API .NET qua Gateway Ocelot. Gateway chạy ở `https://localhost:7107`, nhưng route gateway là `/api-admin`, `/api-thukho`, `/api-thungan`, `/api-ketoan`, `/api-common`; không khớp trực tiếp với `FE/src/services/api.js` hiện tại. Nếu muốn dùng Gateway .NET, cần đổi `VITE_API_BASE_URL` và mapping endpoint trong FE.
