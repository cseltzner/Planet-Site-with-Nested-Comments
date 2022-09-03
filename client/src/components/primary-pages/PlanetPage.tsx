import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { planetData, planets } from "../../data/data";

const PlanetPage = () => {
  const navigate = useNavigate();
  const { planet } = useParams();

  const [planetsObj, setPlanetsObj] = useState({
    name: "planet",
    summary: "summary",
    orbit: "orbit",
    rotation: "rotation",
    radius: "radius",
    mass: "mass",
    temp: "temp",
  });

  // If link is invalid
  useEffect(() => {
    if (!planets.includes(planet!)) {
      navigate("/");
    } else {
      setPlanetsObj(planetData[`${planet?.toLowerCase()}`]);
    }
  }, [planet]);

  const { name, summary, orbit, rotation, radius, mass, temp } = planetsObj;

  // const { name, summary, orbit, rotation, radius, mass, temp } =
  //   planetData[`${planet?.toLowerCase()}`];

  return (
    <>
      <div className="mx-auto flex flex-col items-center gap-4 pt-12 pl-12 pr-12 text-white md:flex-row md:gap-12 md:pl-4 md:pt-24 lg:max-w-7xl">
        <img
          src={`/img/planets/${planet}.svg`}
          alt={`${planet}`}
          className="max-w-sm md:max-w-sm lg:max-w-xl"
        />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-7xl opacity-90">{name}</h1>
          <p className="mt-8 text-xl font-light leading-7 opacity-70">
            {summary}
          </p>
          <button className="mt-4 inline-block w-full bg-secondary-orange text-2xl hover:opacity-95 lg:mt-12">
            <Link to={`/planets/${planet}/discussion`} className="block py-3">
              Discussion
            </Link>
          </button>
          <button className="mt-6 inline-block w-full border border-white border-opacity-50 bg-transparent text-2xl transition-opacity hover:border-opacity-70">
            <a
              href={`https://en.wikipedia.org/wiki/${name}_(planet)`}
              target="_blank"
              className="block py-3"
            >
              More Information
            </a>
          </button>
        </div>
      </div>
      {/* Statistics */}
      <div className="lg:max-w-8xl mx-auto mt-8 flex w-full flex-col items-stretch justify-center gap-2 px-2 md:mt-16 md:flex-row md:flex-wrap md:items-center md:gap-8 md:px-0">
        {/* Orbit */}
        <div className="border border-white border-opacity-50 px-7 py-3 text-white">
          <h3 className="font-light opacity-70">Orbit time</h3>
          <p className="text-5xl font-normal tracking-wide opacity-90">
            {orbit}
          </p>
        </div>
        {/* Rotation */}
        <div className="border border-white border-opacity-50 px-7 py-3 text-white">
          <h3 className="font-light opacity-70">Rotation time</h3>
          <p className="text-5xl font-normal tracking-wide opacity-90">
            {rotation}
          </p>
        </div>
        {/* Radius */}
        <div className="border border-white border-opacity-50 px-7 py-3 text-white">
          <h3 className="font-light opacity-70">Radius</h3>
          <p className="text-5xl font-normal tracking-wide opacity-90">
            {radius}
          </p>
        </div>
        {/* Mass */}
        <div className="border border-white border-opacity-50 px-7 py-3 text-white">
          <h3 className="font-light opacity-70">Mass</h3>
          <p className="text-5xl font-normal tracking-wide opacity-90">
            {mass}
          </p>
        </div>
        {/* Avg Temp */}
        <div className="border border-white border-opacity-50 px-7 py-3 text-white">
          <h3 className="font-light opacity-70">Average Temp</h3>
          <p className="text-5xl font-normal tracking-wide opacity-90">
            {temp}
          </p>
        </div>
      </div>

      {/* For spacing purposes */}
      <div className="h-8"></div>
    </>
  );
};

export default PlanetPage;
