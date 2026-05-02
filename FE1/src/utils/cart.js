const CART_KEY = 'shoppingCart';

export const parsePrice = (price) => Number(String(price).replace(/[^\d]/g, '')) || 0;

export const formatPrice = (value) => `${Number(value).toLocaleString('vi-VN')}đ`;

export const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart-updated'));
};

export const getCartCount = () =>
  getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0);

export const addToCart = (product, quantity = 1) => {
  const items = getCartItems();
  const code = product.code || product.name;
  const found = items.find((item) => item.code === code);

  if (found) {
    found.quantity += quantity;
  } else {
    items.push({
      code,
      name: product.name,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      category: product.category,
      quantity,
      selected: true,
    });
  }

  saveCartItems(items);
  return items;
};
