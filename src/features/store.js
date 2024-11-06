import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productsReducer from "./products/productsSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
