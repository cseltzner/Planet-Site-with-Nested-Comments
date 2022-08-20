import { alertActions, AlertTypes } from "./alertSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const setAlert =
  (msg: string, alertType: AlertTypes, timeout: number = 6000) =>
  (dispatch: Dispatch) => {
    const id = crypto.randomUUID();
    dispatch(alertActions.setAlert({ msg, alertType, id }));

    setTimeout(() => {
      dispatch(alertActions.removeAlert(id));
    }, timeout);
  };
