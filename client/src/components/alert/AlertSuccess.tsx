import React from "react";

interface Props {
  msg: string;
}

const AlertSuccess = (props: Props) => {
  return (
    <div className="relative mx-auto flex w-10/12 flex-col rounded-lg bg-green-50 p-4 shadow-xl">
      <div className="absolute top-0 bottom-0 left-0 w-1 rounded-tl rounded-bl bg-green-400"></div>
      <div className="flex items-start gap-6">
        <div className="mt-[2px] w-4 text-green-400" id="alert-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h4 className="mb-1 font-bold text-green-800">Success!</h4>
          <p className="text-green-700">{props.msg}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
