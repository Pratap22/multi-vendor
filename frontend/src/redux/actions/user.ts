import { createAsyncThunk } from "@reduxjs/toolkit";
import lwpAxios from "../../config/axiosConfig";
import { AxiosError } from "axios";

interface LoginData {
  name?: string;
  email: string;
  password: string;
}

export const loginAsync = createAsyncThunk(
  "user/login",
  async (loginData: LoginData) => {
    try {
      const response = await lwpAxios.post("/user/login", loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error("Login failed: " + error.message);
      } else {
        return Promise.reject();
      }
    }
  }
);

export const signupAsync = createAsyncThunk(
  "user/create",
  async (loginData: LoginData) => {
    const response = await lwpAxios.post("/user/create", loginData, {
      withCredentials: true,
    });
    return response.data;
  }
);
