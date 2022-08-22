import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { authActions } from "./authSlice";
import { defaultHeaders } from "../../util/defaultHeaders";
import { setAuthToken } from "../../util/setAuthToken";
import { setAlert } from "../alert/alertActions";
import { AlertTypes } from "../alert/alertSlice";

// Register
export const register =
  (user: { username: string; email: string; password: string }) =>
  async (dispatch: Dispatch<any>) => {
    const { username, email, password } = user;
    const body = JSON.stringify({ username, email, password });

    try {
      dispatch(authActions.setLoading());
      const res = await axios.post("/api/users", body, defaultHeaders);

      dispatch(authActions.registerSuccess(res.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error?.response?.data.errors as { msg: string }[];
        if (errors) {
          errors.forEach((error) =>
            dispatch(setAlert(error.msg, AlertTypes.DANGER))
          );
        }
      }
      dispatch(authActions.registerFail());
    }
  };

// Load user
export const loadUser = () => async (dispatch: Dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch(authActions.userLoaded(res.data));
  } catch (error) {
    dispatch(authActions.authError());
  }
};

// Log in user
export const login =
  (usernameOrEmail: string, password: string) =>
  async (dispatch: Dispatch<any>) => {
    let body: string;

    if (usernameOrEmail.includes("@")) {
      body = JSON.stringify({ email: usernameOrEmail, password });
    } else {
      body = JSON.stringify({ username: usernameOrEmail, password });
    }

    try {
      const res = await axios.post("/api/auth", body, defaultHeaders);
      dispatch(authActions.loginSuccess(res.data));
      dispatch(loadUser());
    } catch (error) {
      if (error instanceof AxiosError) {
        const errors = error?.response?.data.errors as { msg: string }[];
        if (errors) {
          errors.forEach((error) =>
            dispatch(setAlert(error.msg, AlertTypes.DANGER))
          );
        }
        dispatch(authActions.loginFail());
      }
    }
  };

// Logout user
export const logout = () => async (dispatch: Dispatch<any>) => {
  dispatch(authActions.logout());
};