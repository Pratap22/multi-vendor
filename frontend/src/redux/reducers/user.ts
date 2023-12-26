import { createSlice } from "@reduxjs/toolkit";
import {
  loginAsync,
  createUserAsync,
  activateUserAsync,
  autoLoginAsync,
} from "../actions/user";
import { CartProduct } from "../../type/product";
import { User } from "../../type/user";

interface UserState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
  cart: CartProduct[];
}

const initialState: UserState = {
  loading: "idle",
  isAuthenticated: false,
  error: null,
  user: null,
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartProduct: CartProduct = action.payload;

      const isItemExist = state.cart.find((i) => i._id === cartProduct._id);
      if (isItemExist) {
        return {
          ...state,
          cart: state.cart.map((existingCartProduct) =>
            existingCartProduct._id === isItemExist._id
              ? cartProduct
              : existingCartProduct
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(activateUserAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(activateUserAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(activateUserAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(autoLoginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      });
  },
});

export const { addToCart, removeFromCart } = userSlice.actions;

export default userSlice;
