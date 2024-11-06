import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

