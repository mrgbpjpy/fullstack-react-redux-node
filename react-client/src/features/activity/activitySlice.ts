import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

export type Activity = {
  id: string;
  action: string;
  createdAt: string;
};

type ActivityState = {
  list: Activity[];
  loading: boolean;
  error: string | null;
};

/* ================= STATE ================= */

const initialState: ActivityState = {
  list: [],
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchActivity = createAsyncThunk<
  Activity[],
  void,
  { rejectValue: string }
>("activity/fetch", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/activity", {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue("Failed to load activity");
    }

    const data: Activity[] = await res.json();
    return data;
  } catch {
    return rejectWithValue("Network error");
  }
});

/* ================= SLICE ================= */

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      });
  },
});

export default activitySlice.reducer;
