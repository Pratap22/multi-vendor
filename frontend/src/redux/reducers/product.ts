import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/product";
import {
  createProductAsync,
  deletelProductAsync,
  getAllProductAsync,
} from "../actions/product";

interface ProductState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  products: Product[];
}

const initialState: ProductState = {
  loading: "idle",
  error: null,
  products: [],
};

const productSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        const updatedProductList = state.products;
        updatedProductList.unshift(action.payload);
        state.products = updatedProductList;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(getAllProductAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllProductAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.products = action.payload.products;
      })
      .addCase(getAllProductAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(deletelProductAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deletelProductAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deletelProductAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      });
  },
});

export default productSlice;
