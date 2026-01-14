import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import themeReducer from "./features/theme/themeSlice"
import activityReducer from "./features/activity/activitySlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        activity: activityReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;