import { createContext, useContext } from 'react';

export const roles = {
  admin: 'Quản trị',
  cashier: 'Thu ngân',
  warehouse: 'Thủ kho',
  accountant: 'Kế toán',
};

export const rolePermissions = {
  admin: ['san-pham', 'danh-muc', 'ban-hang', 'don-online', 'doi-tra', 'bao-hanh', 'nhap-kho', 'ton-kho', 'khuyen-mai', 'cong-no', 'thong-ke', 'nhan-vien', 'tai-khoan'],
  cashier: ['ban-hang', 'don-online', 'doi-tra', 'bao-hanh'],
  warehouse: ['san-pham', 'danh-muc', 'nhap-kho', 'ton-kho', 'don-online'],
  accountant: ['cong-no', 'thong-ke', 'don-online'],
};

export const menuItems = [
  { id: 'san-pham', label: 'Sản phẩm điện máy' },
  { id: 'danh-muc', label: 'Danh mục' },
  { id: 'ban-hang', label: 'Bán hàng' },
  { id: 'don-online', label: 'Đơn online' },
  { id: 'doi-tra', label: 'Đổi trả' },
  { id: 'bao-hanh', label: 'Bảo hành' },
  { id: 'nhap-kho', label: 'Nhập kho' },
  { id: 'ton-kho', label: 'Tồn kho' },
  { id: 'khuyen-mai', label: 'Khuyến mãi' },
  { id: 'cong-no', label: 'Công nợ khách hàng' },
  { id: 'thong-ke', label: 'Báo cáo thống kê' },
  { id: 'nhan-vien', label: 'Nhân viên' },
  { id: 'tai-khoan', label: 'Tài khoản' },
];

export const defaultUser = { username: 'admin', role: 'admin' };

export const initialAppState = {
  user: defaultUser,
  currentView: 'san-pham',
  storeCart: [],
};

export const normalizeRole = (role) => rolePermissions[role] ? role : 'cashier';

export const getAllowedViews = (role) => rolePermissions[normalizeRole(role)] || rolePermissions.cashier;

export const getDefaultView = (role) => getAllowedViews(role)[0] || 'ban-hang';

const clampQuantity = (quantity, stock) => Math.max(1, Math.min(Number(quantity) || 1, Number(stock) || 1));

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      const user = action.payload || defaultUser;
      return { ...state, user, currentView: getDefaultView(user.role), storeCart: [] };
    }
    case 'logout':
      return { ...initialAppState, user: null, currentView: 'san-pham' };
    case 'setView': {
      if (!getAllowedViews(state.user?.role).includes(action.payload)) return state;
      return { ...state, currentView: action.payload };
    }
    case 'addStoreCartItem': {
      const product = action.payload;
      const existed = state.storeCart.find((item) => item.id === product.id);
      const storeCart = existed
        ? state.storeCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: clampQuantity(item.quantity + 1, product.stock) }
            : item,
        )
        : [...state.storeCart, { ...product, quantity: 1 }];
      return { ...state, storeCart };
    }
    case 'updateStoreCartQuantity':
      return {
        ...state,
        storeCart: state.storeCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: clampQuantity(action.payload.quantity, item.stock) }
            : item,
        ),
      };
    case 'removeStoreCartItem':
      return { ...state, storeCart: state.storeCart.filter((item) => item.id !== action.payload) };
    case 'clearStoreCart':
      return { ...state, storeCart: [] };
    default:
      return state;
  }
};

export const AppStoreContext = createContext(null);

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) throw new Error('useAppStore must be used inside AppStoreProvider');
  return context;
};
