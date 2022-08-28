import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { authActions } from "./authSlice";
import { defaultHeaders } from "../../util/defaultHeaders";
import { setAuthToken } from "../../util/setAuthToken";
import { setAlert } from "../alert/alertActions";
import { AlertTypes } from "../../util/alertTypes";

// Register
export const register =
  (user: {
    username: string;
    email: string;
    password: string;
    favPlanet?: number;
  }) =>
  async (dispatch: Dispatch<any>) => {
    const { username, email, password, favPlanet } = user;
    let body;
    if (favPlanet) {
      body = JSON.stringify({ username, email, password, favPlanet });
    } else {
      body = JSON.stringify({ username, email, password });
    }

    try {
      dispatch(authActions.setLoading());
      const res = await axios.post("/api/users", body, defaultHeaders);

      dispatch(authActions.registerSuccess(res.data));
      dispatch(
        setAlert("Your account has been registered", AlertTypes.SUCCESS)
      );
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

    if (!usernameOrEmail || !password) {
      dispatch(authActions.loginFail());
      if (!usernameOrEmail) {
        dispatch(
          setAlert("Please enter your username or email", AlertTypes.DANGER)
        );
      }
      if (!password) {
        dispatch(setAlert("Please enter your password", AlertTypes.DANGER));
      }
      return;
    }

    if (usernameOrEmail.includes("@")) {
      body = JSON.stringify({ email: usernameOrEmail, password });
    } else {
      body = JSON.stringify({ username: usernameOrEmail, password });
    }

    try {
      dispatch(authActions.setLoading());
      const res = await axios.post("/api/auth", body, defaultHeaders);
      dispatch(authActions.loginSuccess(res.data));
      dispatch(setAlert("You are now logged in", AlertTypes.SUCCESS));
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
