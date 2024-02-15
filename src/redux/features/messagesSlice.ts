/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import { Tab } from "@/types/Tab";
import { loginUser } from "@/app/services/loginUser";
import { User, UserLoginInfo } from "@/types/User";
import { registerUser } from "@/app/services/registerUser";

const initialState = {
  messages: [
    { id: 0, id_chat: 1, message: "", name_sender: "", createdAt: "" },
  ],
};
export const messagesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = messagesSlice.actions;

export default messagesSlice.reducer;

export type ChatState = ReturnType<typeof store.getState>;
export type ChatDispatch = typeof store.dispatch;
