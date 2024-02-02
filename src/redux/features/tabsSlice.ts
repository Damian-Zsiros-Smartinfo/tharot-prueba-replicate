import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";
import Home from "@/pages";

const initialState = {
  tabs: [
    {
      text: "Home",
      nameFile: "HomeTab.tsx",
      fixed: true,
    },
    {
      text: "Home 2",
      nameFile: "Home2Tab.tsx",
    },
  ],
  id: 1,
  activeTab: 0,
};
export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action) => {},
    changeActiveTab: (state, action) => {
      const { tabIndex }: { tabIndex: number } = action.payload;
      state.activeTab = tabIndex;
    },
  },
});

export const { addTab, changeActiveTab } = tabsSlice.actions;

export default tabsSlice.reducer;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
