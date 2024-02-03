/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

const initialState = {
  tabs: [
    {
      text: "Home",
      nameFile: "HomeTab.tsx",
      fixed: true
    }
  ],
  activeTab: 0
};
export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {
      const info: { text: string; component: string } = action.payload;
      state.tabs.push({
        text: info.text,
        nameFile: info.component,
        fixed: false
      });

      state.activeTab = state.tabs.length - 1;
    },
    changeActiveTab: (state, action) => {
      const tabIndex = action.payload;
      state.activeTab = tabIndex;
    },
    closeTab: (state, action) => {
      const tabIndex = action.payload;
      state.activeTab = state.activeTab - 1;
      state.tabs.splice(tabIndex, 1);
    }
  }
});

export const { addTab, changeActiveTab, closeTab } = tabsSlice.actions;

export default tabsSlice.reducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
