import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {login, register } from "../../api"


type User = {
    id: string;
    email: string;
    name: string;
};

type AuthState = {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async(
        data: {email: string; password: string; name: string },
        { rejectWithValue }
    ) => {
        try {
            return await register(data);
        } catch {
            return rejectWithValue("Registration Failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        data: {email: string; password: string },
        { rejectWithValue }
    ) => {
        try{
            return await login(data);
        } catch {
            return rejectWithValue("Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder

        //register
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
            state.error = action.payload as string;
        })

        //login
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) =>{
            state.loading = false;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;