import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const BASE = import.meta.env.VITE_API_URL + "/api/";


/* ================= TYPES ================= */

export interface Activity {
  id: string;
  action: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

export interface ActivityFilters {
  action?: string;
  from?: string;
  to?: string;
}

interface ActivityState  {
  items: Activity[];
  filters: ActivityFilters;
  nextCursor?: string | null;
  loading: boolean;
  error?: string | null;
};

/* ================= STATE ================= */

const initialState: ActivityState = {
  items: [],
  filters: {},
  nextCursor: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchActivity = createAsyncThunk<
  { items: Activity[]; nextCursor: string | null },
  {reset?: boolean} | void,
  {state: RootState}
>("activity/fetch", async (args, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const { filters, nextCursor } = state.activity;
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue("Not authenticated");
    }

    const params = new URLSearchParams();

    if (filters.action) params.append("action", filters.action);
    if (filters.from) params.append("from", filters.from);
    if (filters.to) params.append("to", filters.to);
    if (nextCursor && !args?.reset) {
      params.append("cursor", nextCursor);
    }

    params.append("limit", "20");

    const res = await fetch(`${BASE}activity?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = (data && typeof data === "object" && "message" in data)
        ? String((data as any).message)
        : "Failed to load activity";
      return rejectWithValue(message);
    }

    // Back-compat: some deployments may return a raw array.
    if (Array.isArray(data)) {
      return { items: data as Activity[], nextCursor: null };
    }

    if (data && typeof data === "object" && Array.isArray((data as any).items)) {
      return data as { items: Activity[]; nextCursor: string | null };
    }

    return rejectWithValue("Unexpected activity response");
    
  } catch (err) {
    console.error("fetchActivity failed", err);
    return rejectWithValue("Network error");
  }
});

// ---------- Slice ----------

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ActivityFilters>) {
      state.filters = action.payload;
      state.items = [];
      state.nextCursor = null;
    },
    clearActivity(state) {
      state.items = [];
      state.nextCursor = null;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;

        const arg: any = action.meta.arg;
        if (arg?.reset) {
          state.items = [];
          state.nextCursor = null;
        }
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        const payload: any = action.payload;
        const newItems: Activity[] = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.items)
            ? payload.items
            : [];

        const arg: any = action.meta.arg;
        if (arg?.reset) {
          state.items = newItems;
        } else {
          state.items.push(...newItems);
        }

        state.nextCursor =
          payload && typeof payload === "object" && "nextCursor" in payload
            ? (payload.nextCursor as string | null)
            : null;

        if (!Array.isArray(payload) && !Array.isArray(payload?.items)) {
          state.error = "Unexpected activity response";
        }
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ---------- Exports ----------

export const { setFilters, clearActivity } = activitySlice.actions;

export const selectActivity = (state: RootState) => state.activity.items;
export const selectActivityLoading = (state: RootState) =>
  state.activity.loading;
export const selectActivityHasMore = (state: RootState) =>
  Boolean(state.activity.nextCursor);

export default activitySlice.reducer;
