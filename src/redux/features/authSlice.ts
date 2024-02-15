/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authStore } from "../authStore";
import { Tab } from "@/types/Tab";
import { loginUser } from "@/app/services/loginUser";
import { User, UserLoginInfo, UserWithId } from "@/types/User";
import { registerUser } from "@/app/services/registerUser";
interface State {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  token: string;
  logued: boolean;
  registered: boolean;
  exists: boolean;
  error: {
    message: string;
  } | null;
}
const initialState: State = {
  user: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
  },
  exists: false,
  token: "",
  logued: false,
  registered: false,
  error: { message: "" },
};

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (info: UserLoginInfo) => {
    const { data } = await loginUser(info);
    return data;
  }
);

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (info: User) => {
    await registerUser(info);
    return info;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = { message: "" };
        state.registered = false;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { user, token, logued, error } = action.payload;

        state.user = user as {
          id: number;
          name: string;
          email: string;
          phone: string;
          password: string;
        };
        state.token = token;
        state.error = {
          message: error?.message || "",
        };
        state.logued = logued;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = { message: action.error.message || "" };
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.error = { message: "" };
        state.registered = false;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        const { user, token, registered, error } =
          action.payload as unknown as {
            user: User;
            token: string;
            registered: boolean;
            error: { message: string };
          };

        state.user = user as {
          id: number;
          name: string;
          email: string;
          phone: string;
          password: string;
        };
        state.token = token;
        state.error = {
          message: error?.message || "",
        };
        state.registered = registered;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.error = { message: action.error.message || "" };
      });
  },
});

export default authSlice.reducer;

export type AuthState = ReturnType<typeof authStore.getState>;
export type AuthDispatch = typeof authStore.dispatch;
