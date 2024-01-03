import { createSlice } from "@reduxjs/toolkit";
import {
  shopLoginAsync,
  createShopAsync,
  activateShopAsync,
  shopAutoLoginAsync,
  getShopOrders,
} from "../actions/shop";
import { PaymentData } from "../../type/order";

interface Shop {
  _id: string;
  name: string;
  email: string;
}
interface ShopState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  isAuthenticated: boolean;
  error: string | null;
  shop: Shop | null;
  orders: Array<PaymentData>;
}

const initialState: ShopState = {
  loading: "idle",
  isAuthenticated: false,
  error: null,
  shop: null,
  orders: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shopLoginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(shopLoginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.shop = action.payload.user;
      })
      .addCase(shopLoginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(createShopAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createShopAsync.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createShopAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(activateShopAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(activateShopAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.shop = action.payload.user;
      })
      .addCase(activateShopAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(shopAutoLoginAsync.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(shopAutoLoginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.shop = action.payload.user;
      })
      .addCase(shopAutoLoginAsync.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getShopOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  },
});

export default shopSlice;
