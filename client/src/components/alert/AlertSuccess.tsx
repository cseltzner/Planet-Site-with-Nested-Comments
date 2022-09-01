import React, { useState } from "react";

interface Props {
  msg: string;
}

const AlertSuccess = (props: Props) => {
  const [remove, setRemove] = useState(false);

  return (
    <div
      className={`${
        remove && "hidden"
      } relative z-10 mx-auto flex w-10/12 flex-col rounded-lg bg-green-50 p-4 shadow-xl`}
    >
      <div className="absolute top-0 bottom-0 left-0 w-1 rounded-tl rounded-bl bg-green-400"></div>
      <div
        className="absolute top-4 right-4 cursor-pointer rounded-full hover:bg-green-200"
        onClick={() => setRemove(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 p-1 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

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
