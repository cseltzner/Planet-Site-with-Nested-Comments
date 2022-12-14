import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/auth/authActions";
import Spinner from "../layout/Spinner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(login(formData.username, formData.password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/");
    }
    document.title = "Sign in | PlanetFacts";
  }, [isAuthenticated]);

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
            onChange={(e) => {
              onFormChange(e);
            }}
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <label htmlFor="password" className="mt-8 tracking-wide text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              onFormChange(e);
            }}
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
            className="mt-8 flex w-full items-center justify-center bg-secondary-orange py-2 text-xl text-white hover:opacity-95 sm:text-2xl"
          >
            {isLoading ? <Spinner /> : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
