import { createAsyncThunk } from "@reduxjs/toolkit";
import lwpAxios from "../../config/axiosConfig";
import { AxiosError } from "axios";

interface ShopLoginData {
  name?: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  zipCode?: string;
  rememberMe?: boolean;
}

export const shopLoginAsync = createAsyncThunk(
  "shop/login",
  async (loginData: ShopLoginData) => {
    try {
      const response = await lwpAxios.post("/shop/login", loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error("Login failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);

export const createShopAsync = createAsyncThunk(
  "shop/create",
  async (loginData: ShopLoginData) => {
    try {
      const response = await lwpAxios.post("/shop/create", loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error("Create failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);

export const activateShopAsync = createAsyncThunk(
  "shop/active",
  async (token: string) => {
    try {
      const response = await lwpAxios.get(`/shop/activation/${token}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error("Login failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);

export const shopAutoLoginAsync = createAsyncThunk(
  "shop/autoLogin",
  async () => {
    try {
      const response = await lwpAxios.get("/shop", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error("Login failed: " + error.response?.data.message);
      } else {
        return Promise.reject();
      }
    }
  }
);
