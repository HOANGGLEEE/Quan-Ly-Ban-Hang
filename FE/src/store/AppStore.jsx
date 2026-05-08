import React, { useMemo, useReducer } from 'react';
import {
  AppStoreContext,
  appReducer,
  getAllowedViews,
  getDefaultView,
  initialAppState,
  menuItems,
  normalizeUser,
} from './AppStoreCore';

const SESSION_KEY = 'qlbl_user';

const loadInitialState = () => {
  try {
    const savedUser = normalizeUser(JSON.parse(localStorage.getItem(SESSION_KEY)));
    if (!savedUser) return initialAppState;
    return { ...initialAppState, user: savedUser, currentView: getDefaultView(savedUser.role) };
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return initialAppState;
  }
};

export const AppStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState, loadInitialState);

  const value = useMemo(() => {
    const allowedViews = getAllowedViews(state.user?.role);
    const visibleMenuItems = menuItems.filter((item) => allowedViews.includes(item.id));
    const storeCartSubtotal = state.storeCart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

    return {
      state,
      allowedViews,
      visibleMenuItems,
      storeCartSubtotal,
      login: (user) => {
        const normalizedUser = normalizeUser(user);
        if (normalizedUser) localStorage.setItem(SESSION_KEY, JSON.stringify(normalizedUser));
        dispatch({ type: 'login', payload: normalizedUser });
      },
      logout: () => {
        localStorage.removeItem(SESSION_KEY);
        dispatch({ type: 'logout' });
      },
      setView: (view) => dispatch({ type: 'setView', payload: view }),
      addStoreCartItem: (product) => dispatch({ type: 'addStoreCartItem', payload: product }),
      updateStoreCartQuantity: (id, quantity) => dispatch({ type: 'updateStoreCartQuantity', payload: { id, quantity } }),
      removeStoreCartItem: (id) => dispatch({ type: 'removeStoreCartItem', payload: id }),
      clearStoreCart: () => dispatch({ type: 'clearStoreCart' }),
    };
  }, [state]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};
