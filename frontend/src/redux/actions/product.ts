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
