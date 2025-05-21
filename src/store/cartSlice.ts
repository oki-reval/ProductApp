import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
  selectedIds: number[]; // untuk menyimpan id produk yang dipilih
}

const initialState: CartState = {
  items: [],
  selectedIds: [],
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
      state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
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
      state.selectedIds = [];
    },

    // ✅ Untuk fitur checklist
    toggleSelect: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(i => i !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelected: (state) => {
      state.selectedIds = [];
    },
    selectAll: (state) => {
      state.selectedIds = state.items.map(item => item.id);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  toggleSelect,
  clearSelected,
  selectAll,
} = cartSlice.actions;

export default cartSlice.reducer;
