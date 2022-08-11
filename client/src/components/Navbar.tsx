import React from "react";
import { Link, useParams } from "react-router-dom";

const Navbar = () => {
  const curPlanet = useParams().planet;
  console.log(curPlanet);

  return (
    <div className="fixed-top flex items-center justify-between gap-10 border-b border-b-white-op-50 px-9 py-7">
      {/* Logo */}
      <div className=" cursor-pointer  text-3xl text-white opacity-90 md:text-4xl lg:text-5xl">
        <Link to="/">PlanetFacts</Link>
      </div>
      {/* Planet list */}
      <ul className="hidden flex-wrap justify-center gap-4 text-lg tracking-wider text-white  md:flex xl:text-xl">
        <li>
          <Link
            to="/planets/Mercury"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Mercury" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Mercury
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Venus"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Venus" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Venus
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Earth"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Earth" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Earth
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Mars"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Mars" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Mars
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Jupiter"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Jupiter" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Jupiter
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Saturn"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Saturn" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Saturn
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Uranus"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Uranus" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Uranus
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Neptune"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Neptune" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Neptune
          </Link>
        </li>
        <li>
          <Link
            to="/planets/Pluto"
            className={`opacity-80 hover:opacity-90 ${
              curPlanet &&
              curPlanet === "Pluto" &&
              "text-secondary-orange opacity-100"
            }`}
          >
            Pluto
          </Link>
        </li>
      </ul>
      {/* Sign in button (Med screens and above) */}
      <Link
        to="/login"
        className="align-align-self-center hidden min-w-fit text-lg text-white opacity-90 hover:opacity-100 md:inline-block lg:text-xl"
      >
        Sign in
      </Link>
      {/* Hamburger button (Smaller than med screens) */}
      <div className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 cursor-pointer text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
