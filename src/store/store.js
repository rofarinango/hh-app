import { configureStore } from "@reduxjs/toolkit";
import { hhSlice } from "./hh/hhSlice";

export const store = configureStore({
    reducer: {
        hh: hhSlice.reducer,
    },
});