import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
