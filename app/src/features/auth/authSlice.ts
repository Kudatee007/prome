import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JWT_STORAGE_KEY } from "@/config/constants";
import type { StrapiUser } from "@/api/authApi";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: StrapiUser | null;
};
const initialState: AuthState = {
  token: localStorage.getItem(JWT_STORAGE_KEY),
  isAuthenticated: !!localStorage.getItem(JWT_STORAGE_KEY),
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSucceeded(state, action: PayloadAction<{ token: string; user: StrapiUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem(JWT_STORAGE_KEY, action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(JWT_STORAGE_KEY);
    },
    setUser(state, action: PayloadAction<StrapiUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { loginSucceeded, logout, setUser } = slice.actions;
export default slice.reducer;
