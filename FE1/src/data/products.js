import productCatalog from './productCatalog.json';

const byGroup = (group) => productCatalog.filter((product) => product.group === group);

export const tvProducts = byGroup('tivi');
export const washingMachineProducts = byGroup('may-giat');
export const airConditionerProducts = byGroup('dieu-hoa');
export const riceCookerProducts = byGroup('noi-com-dien');
export const kettleProducts = byGroup('am-sieu-toc');

export const refrigeratorWasherProducts = washingMachineProducts;
export const monitorProducts = airConditionerProducts;
export const accessoryProducts = [...riceCookerProducts, ...kettleProducts];

export const featuredProducts = [
  ...tvProducts.slice(0, 4),
  ...washingMachineProducts.slice(0, 3),
  ...airConditionerProducts.slice(0, 3),
];

export const storeProducts = productCatalog;

export const usedProducts = [
  ...tvProducts.slice(0, 5),
  ...washingMachineProducts.slice(0, 5),
  ...airConditionerProducts.slice(0, 5),
  ...riceCookerProducts.slice(0, 5),
  ...kettleProducts.slice(0, 5),
].map((product, index) => {
  const priceNumber = Number(product.price.replace(/\D/g, ''));
  const salePrice = priceNumber
    ? Math.round(priceNumber * 0.9).toLocaleString('vi-VN')
    : product.price;

  return {
    ...product,
    code: `KM-${String(index + 1).padStart(3, '0')}`,
    oldPrice: product.price,
    price: salePrice,
    gift: 'Sản phẩm khuyến mãi, bảo hành chính hãng',
    category: 'Điện máy khuyến mãi',
  };
});
