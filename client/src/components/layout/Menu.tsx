import React from "react";
import { Link } from "react-router-dom";
import { planets } from "../../data/data";

interface Props {
  isHidden: boolean;
  closeMenu: () => void;
}

const NavMenu = (props: Props) => {
  const { isHidden, closeMenu } = props;

  const closeMenuClicked = () => {
    closeMenu();
  };

  return (
    <div
      className={`${
        isHidden ? "translate-x-full" : "translate-x-0"
      } fixed inset-0 z-20 bg-gradient-to-b from-black to-gray-900 opacity-[98%] transition-all md:transition-none`}
    >
      <ul className="w-full p-3 text-center text-white">
        {/* Planet items */}
        {planets.map((planet, index) => {
          return (
            <li
              key={index}
              className="border border-white border-opacity-50 py-3 text-2xl"
            >
              <Link
                className="opacity-90"
                to={`/planets/${planet}`}
                onClick={() => closeMenuClicked()}
              >
                {planet}
              </Link>
            </li>
          );
        })}
        {/* Sign in button */}
        <li className="border border-white border-opacity-50 py-3 text-2xl">
          <Link
            className="text-secondary-orange opacity-90"
            to={`/login`}
            onClick={() => closeMenuClicked()}
          >
            Sign in
          </Link>
        </li>
        {/* Register button */}
        <li className="border border-white border-opacity-50 py-3 text-2xl">
          <Link
            className="text-secondary-orange opacity-90"
            to={`/register`}
            onClick={() => closeMenuClicked()}
          >
            Register
          </Link>
        </li>
      </ul>
      <svg
        onClick={() => closeMenuClicked()}
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          isHidden ? "opacity-0" : "opacity-100"
        } fixed top-6 right-8 h-8 w-8 rounded-full bg-gray-700 p-1 text-white`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default NavMenu;
