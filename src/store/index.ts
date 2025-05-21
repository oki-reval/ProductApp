import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Buat store
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

// Tipe RootState dan AppDispatch dari store kita
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Buat hooks khusus supaya gak perlu tulis tipe berulang-ulang
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
