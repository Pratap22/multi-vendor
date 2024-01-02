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
  cart: JSON.parse(localStorage.getItem("user_cart") || "[]"),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartProduct: CartProduct = action.payload;

      const isItemExist = state.cart.find((i) => i._id === cartProduct._id);
      if (isItemExist) {
        state.cart = state.cart.map((existingCartProduct) =>
          existingCartProduct._id === isItemExist._id
            ? cartProduct
            : existingCartProduct
        );
      } else {
        state.cart = [...state.cart, cartProduct];
      }

      localStorage.setItem("user_cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      localStorage.setItem("user_cart", JSON.stringify(state.cart));
    },
    emptyCart: (state) => {
      state.cart = [];
      localStorage.setItem("user_cart", JSON.stringify(state.cart));
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
      .addCase(autoLoginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(autoLoginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(autoLoginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { addToCart, removeFromCart, emptyCart } = userSlice.actions;

export default userSlice;
