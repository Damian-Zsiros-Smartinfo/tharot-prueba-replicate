import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from '@/redux/features/tabsSlice'

export const store = configureStore({
    reducer:{
        tabsReducer  
    }
})