/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import Home from "@/pages";

const initialState = {
  tabs: [
    {
      text: "Home",
      nameFile: "HomeTab.tsx",
      fixed: true
    },
    {
      text: "Home 2",
      nameFile: "Home2Tab.tsx"
    }
  ],
  id: 1,
  activeTab: 0
};
export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {},
    changeActiveTab: (state, action) => {
      console.log(action.payload);
      const tabIndex = action.payload;
      state.activeTab = tabIndex;
      console.log({ tabIndex, active: state.activeTab });
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
