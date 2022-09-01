import React, { useState } from "react";

interface Props {
  msg: String;
}

const AlertError = (props: Props) => {
  const [remove, setRemove] = useState(false);

  return (
    <div
      className={`${
        remove && "hidden"
      } relative z-10 mx-auto flex w-10/12 flex-col rounded-lg bg-red-50 p-4 shadow-xl`}
    >
      <div className="absolute top-0 bottom-0 left-0 w-1 rounded-tl rounded-bl bg-red-600"></div>
      <div
        className="absolute top-4 right-4 cursor-pointer rounded-full hover:bg-red-200"
        onClick={() => setRemove(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 p-1 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="flex items-start gap-6">
        <div className="w-4 text-red-600" id="alert-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h4 className="mb-1 font-bold text-red-900">
            There was an error with your submission
          </h4>
          <div className=" text-red-800">
            <p className="ml-8 text-lg">{props.msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertError;
