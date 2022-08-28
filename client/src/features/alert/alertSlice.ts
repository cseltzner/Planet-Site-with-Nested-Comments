import { createSlice } from "@reduxjs/toolkit";
import { AlertTypes } from "../../util/alertTypes";

export interface AlertInterface {
  id: string;
  msg: string;
  alertType: AlertTypes;
}

const initialState: AlertInterface[] = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
