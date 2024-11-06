import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAsyncProducts = createAsyncThunk(
  "products/getAsyncProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },
    extraReducers: (builder) => {
      builder
        .addCase(getAsyncProducts.pending, (state) => {
          state.loading = true;
          state.products = [];
          state.error = "";
        })
        .addCase(getAsyncProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
          state.error = "";
        })
        .addCase(getAsyncProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.products = [];
        });
    },
});

export default productsSlice.reducer;
