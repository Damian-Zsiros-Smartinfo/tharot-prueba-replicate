import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice";

export const authStore = configureStore({
  reducer: {
    authReducer,
  },
});
