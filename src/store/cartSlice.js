import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(
        i => i.id === action.payload.id && i.size === action.payload.size
      );
      if (existing) { existing.quantity += 1; }
      else { state.items.push({ ...action.payload, quantity: 1 }); }
      state.total = state.items.reduce((s,i) => s + i.price * i.quantity, 0);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((_,i) => i !== action.payload);
      state.total = state.items.reduce((s,i) => s + i.price * i.quantity, 0);
    },
    clearCart(state) { state.items = []; state.total = 0; },
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;