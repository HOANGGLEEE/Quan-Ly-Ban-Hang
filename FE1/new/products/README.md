# Cách thay ảnh sản phẩm

Vite của dự án đang dùng `new` làm thư mục public, nên ảnh chạy trên web cần nằm ở `new/products`.

Thư mục `public/products` chỉ là bản lưu phụ. Khi thay ảnh, hãy đặt ảnh vào `new/products`, rồi sửa tên file trong `src/data/products.js`.

Ví dụ:

```js
image: productImage('tivi-samsung-75-inch.jpg')
```

Nghĩa là file ảnh cần nằm ở:

```txt
new/products/tivi-samsung-75-inch.jpg
```

Bạn có thể dùng ảnh `.jpg`, `.png`, `.webp`. Chỉ cần tên file trong code trùng đúng với tên file ảnh.
