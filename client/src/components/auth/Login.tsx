import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const loginSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col items-center py-12">
        <h1 className="text-6xl font-light tracking-tight text-white">
          Sign in
        </h1>
        <form className="mt-12 flex flex-col rounded bg-black bg-opacity-30 p-8">
          <label htmlFor="username" className="tracking-wide text-white">
            Username or email
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <label htmlFor="password" className="mt-8 tracking-wide text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <p className="mt-2 text-white text-opacity-60">
            Don't have an account?{" "}
            <span className="text-secondary-orange hover:opacity-95">
              <Link to={"/register"}>Create an account</Link>
            </span>
          </p>
          <button
            onClick={(e) => loginSubmit(e)}
            className="mt-8 inline-block w-full bg-secondary-orange py-2 text-xl text-white hover:opacity-95 sm:text-2xl"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
