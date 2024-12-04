import { configureStore } from "@reduxjs/toolkit";
import { hhSlice } from "./hh/hhSlice";
import { youtubeAPI } from "./youtube_api";

export const store = configureStore({
    reducer: {
        hh: hhSlice.reducer,
        [youtubeAPI.reducerPath]: youtubeAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( youtubeAPI.middleware )
});