import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

export type ThemeMode = "identity" | "system" | "activity";

type ThemeState = {
  mode: ThemeMode;
};

/* ================= INIT ================= */

const savedMode = localStorage.getItem("themeMode") as ThemeMode | null;

const initialState: ThemeState = {
  mode: savedMode ?? "identity",
};

/* ================= SLICE ================= */

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    hydrateTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

/* ================= EXPORTS ================= */

export const { setTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;
