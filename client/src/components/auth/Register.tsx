import React, { useState } from "react";
import { Link } from "react-router-dom";
import { planets } from "../../data/data";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    favPlanet: 1,
  });

  const [planetSelected, setPlanetSelected] = useState<null | number>(null);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const registerSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col items-center py-6">
        <form className="mt-3 flex flex-col rounded bg-black bg-opacity-30 p-8">
          <h1 className="text-center text-3xl font-light tracking-tight text-white">
            Register
          </h1>
          <label
            htmlFor="username"
            className="mt-4 tracking-wide text-white text-opacity-90"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <label
            htmlFor="email"
            className="mt-8 tracking-wide text-white text-opacity-90"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <label
            htmlFor="password"
            className="mt-8 tracking-wide text-white text-opacity-90"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <label
            htmlFor="confirm-password"
            className="mt-8 tracking-wide text-white text-opacity-90"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="mt-0.5 w-full border border-white border-opacity-50 bg-black bg-opacity-50 px-4 py-2 text-lg tracking-wider text-white invalid:border-red-700 sm:min-w-[400px]"
          />
          <p className="mt-2 text-white text-opacity-60">
            Already have an account?{" "}
            <span className="text-secondary-orange hover:opacity-95">
              <Link to={"/login"}>Sign in</Link>
            </span>
          </p>
          <div className="mt-6">
            <label className="text-xl tracking-wide text-white text-opacity-90">
              Favorite Planet
            </label>
            <div className="mt-4 flex max-w-xl flex-wrap justify-center gap-1">
              {planets.map((planet, index) => {
                return (
                  <div
                    id={planet}
                    className={`p-2 transition-all duration-100 hover:rounded-full hover:bg-black hover:bg-opacity-40 ${
                      planetSelected === index &&
                      "rounded-full bg-black bg-opacity-50"
                    }`}
                    onClick={(e) => setPlanetSelected(index)}
                  >
                    <img
                      src={`/img/planets/${planet}.svg`}
                      alt={planet}
                      className="w-20"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={(e) => registerSubmit(e)}
            className="mt-8 inline-block w-full bg-secondary-orange py-2 text-xl text-white hover:opacity-95 sm:text-2xl"
          >
            Create your account
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
