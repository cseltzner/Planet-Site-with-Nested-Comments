import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultHeaders } from "../../util/defaultHeaders";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    authError: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
