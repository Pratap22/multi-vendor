import { createAsyncThunk } from "@reduxjs/toolkit";
import lwpAxios from "../../config/axiosConfig";
import { AxiosError } from "axios";
import { Product } from "../../type/product";

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product: Product) => {
    try {
      const response = await lwpAxios.post("/product/", product, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          "Create Product failed: " + error.response?.data.message
        );
      } else {
        return Promise.reject();
      }
    }
  }
);

export const getAllProductAsync = createAsyncThunk(
  "product/getList",
  async () => {
    try {
      const response = await lwpAxios.get("/product/", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          "Fetch All Product failed: " + error.response?.data.message
        );
      } else {
        return Promise.reject();
      }
    }
  }
);

export const deletelProductAsync = createAsyncThunk(
  "product/delete",
  async (id: string) => {
    try {
      await lwpAxios.delete(`/product/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          "Delete Product failed: " + error.response?.data.message
        );
      } else {
        return Promise.reject();
      }
    }
  }
);
