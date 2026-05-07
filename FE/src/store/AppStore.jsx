import React, { useMemo, useReducer } from 'react';
import {
  AppStoreContext,
  appReducer,
  getAllowedViews,
  initialAppState,
  menuItems,
} from './AppStoreCore';

export const AppStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const value = useMemo(() => {
    const allowedViews = getAllowedViews(state.user?.role);
    const visibleMenuItems = menuItems.filter((item) => allowedViews.includes(item.id));
    const storeCartSubtotal = state.storeCart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

    return {
      state,
      allowedViews,
      visibleMenuItems,
      storeCartSubtotal,
      login: (user) => dispatch({ type: 'login', payload: user }),
      logout: () => dispatch({ type: 'logout' }),
      setView: (view) => dispatch({ type: 'setView', payload: view }),
      addStoreCartItem: (product) => dispatch({ type: 'addStoreCartItem', payload: product }),
      updateStoreCartQuantity: (id, quantity) => dispatch({ type: 'updateStoreCartQuantity', payload: { id, quantity } }),
      removeStoreCartItem: (id) => dispatch({ type: 'removeStoreCartItem', payload: id }),
      clearStoreCart: () => dispatch({ type: 'clearStoreCart' }),
    };
  }, [state]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};
