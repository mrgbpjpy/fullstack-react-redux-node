import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "../../api";



/* ================= TYPES ================= */

export type User = {
  id: string;
  email: string;
  name: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

/* ================= STATE ================= */
const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken,
  loading: false,
  error: null,
};

/* ================= THUNKS ================= */

export const loadMe = createAsyncThunk<
User,
string,
{rejectValue: string}
>("auth/loadMe", async (token, { rejectWithValue }) => {
    try{
      const user = await getMe(token);
      return user;
    } catch {
      return rejectWithValue("Session expired");
    }
});

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    console.log("REGISTER THUNK FIRED", data);

    const res = await fetch("https://fullstack-react-redux-api.vercel.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("REGISTER STATUS", res.status);

    const json = await res.json();
    console.log("REGISTER RESPONSE", json);

    return json;
  } catch (err: unknown) {
    console.error("REGISTER ERROR", err);
    return rejectWithValue("Registration failed");
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    console.log("LOGIN THUNK FIRED", data);

    const res = await fetch("https://fullstack-react-redux-api.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("LOGIN STATUS", res.status);

    const json = await res.json();
    console.log("LOGIN RESPONSE", json);

    return json;
  } catch (err: unknown) {
    console.error("LOGIN ERROR", err);
    return rejectWithValue("Login failed");
  }
});

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder

      /* -------- REGISTER -------- */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      })

      /* -------- LOGIN -------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token",action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      /*-------- LoadMe -------- */ 
      .addCase(loadMe.pending, (state) =>{
        state.loading = true;
      })
      .addCase(loadMe.fulfilled, (state, action) =>{
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadMe.rejected, (state) => {
        state.loading = false;
        state.user = null;;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
  },
});

/* ================= EXPORTS ================= */

export const { logout } = authSlice.actions;
export default authSlice.reducer;
