import { alertActions } from "./alertSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { AlertTypes } from "../../util/alertTypes";
import {v4 as uuidv4} from "uuid"

export const setAlert =
  (msg: string, alertType: AlertTypes, timeout: number = 6000) =>
  (dispatch: Dispatch) => {
    const id = uuidv4()
    dispatch(alertActions.setAlert({ msg, alertType, id }));

    setTimeout(() => {
      dispatch(alertActions.removeAlert(id));
    }, timeout);
  };
