import React from "react";
import { AlertInterface } from "../../features/alert/alertSlice";
import { AlertTypes } from "../../util/alertTypes";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";

interface Props {
  alerts: AlertInterface[];
}

const Alert = (props: Props) => {
  return (
    <div
      className={`fixed top-0 z-10 mt-12 flex w-full flex-col gap-4 ${
        props.alerts.length < 1 && "hidden"
      }`}
    >
      {props.alerts.map((alert) => {
        switch (alert.alertType) {
          case AlertTypes.DANGER:
            return <AlertError key={alert.id} msg={alert.msg} />;
          case AlertTypes.SUCCESS:
            return <AlertSuccess key={alert.id} msg={alert.msg} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Alert;
